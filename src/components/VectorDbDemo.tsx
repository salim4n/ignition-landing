import {  useEffect, useRef, useState } from 'react';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';
import useRagStore from '../store/ragStore';

interface VectorDbDemoProps {
  t: any
}

interface Point {
  x: number;
  y: number;
  text: string;
}

const VectorDbDemo = ({ t }: VectorDbDemoProps) => {
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState('');
  const [points, setPoints] = useState<Point[]>([]);
  const { vectors, addVector, loading: ragLoading } = useRagStore();
  const textDatabase = useRef<string[]>([]);
  const vizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initModel = async () => {
      try {
        await tf.ready();
        console.log('TensorFlow.js ready');
        console.log('tf backend:', tf.getBackend());
        const loadedModel = await use.load();
        setModel(loadedModel);
        setLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
        setLoading(false);
      }
    };

    initModel().then(() => console.log('Model loaded'));

    return () => {
      if (model) {
        model.dispose();
      }
      tf.dispose();
    };
  }, [model]);

  const textToVector = async (text: string) => {
    if (!model) return null;
    const embeddings = await model.embed([text]);
    const vector = await embeddings.array();
    embeddings.dispose();
    return vector[0];
  };

  const cosineSimilarity = (vecA: number[], vecB: number[]) => {
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (normA * normB);
  };

  const updateVisualization = (vectors: number[][]) => {
    if (!vectors || vectors.length === 0 || !vectors[0] || !vizRef.current) {
      console.log('No valid vectors to visualize');
      return;
    }

    try {
      const mean = vectors.reduce((acc, vec) => 
        acc.map((v, i) => v + vec[i]), new Array(vectors[0].length).fill(0))
        .map(v => v / vectors.length);

      const centered = vectors.map(vec => 
        vec.map((v, i) => v - mean[i]));

      const x: number[] = [];
      const y: number[] = [];
      
      for (let i = 0; i < vectors.length; i++) {
        const vec = centered[i];
        const halfLength = Math.floor(vec.length / 2);
        const xSum = vec.slice(0, halfLength).reduce((a, b) => a + b, 0);
        const ySum = vec.slice(halfLength).reduce((a, b) => a + b, 0);
        x.push(xSum / halfLength);
        y.push(ySum / halfLength);
      }

      const maxX = Math.max(...x.map(Math.abs)) || 1;
      const maxY = Math.max(...y.map(Math.abs)) || 1;
      const scale = Math.min(vizRef.current!.clientWidth, vizRef.current!.clientHeight) / 2 / Math.max(maxX, maxY);

      const newPoints = vectors.map((_, i) => ({
        x: (vizRef.current!.clientWidth/2 + x[i] * scale),
        y: (vizRef.current!.clientHeight/2 + y[i] * scale),
        text: textDatabase.current[i] || 'Search point'
      }));

      setPoints(newPoints);
    } catch (error) {
      console.error('Error in visualization:', error);
    }
  };

  const addText = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const vector = await textToVector(inputText);
      if (vector && vector.length > 0) {
        const newVector = {
          id: Date.now().toString(),
          category: 'demo',
          timestamp: new Date().toISOString(),
          vector: vector,
          content: inputText
        };
        addVector(newVector);
        textDatabase.current.push(inputText);
        setInputText('');
        updateVisualization(vectors.map(v => v.vector));
        setResults(`Added: "${inputText}"`);
      } else {
        setResults('Error: Could not generate vector for text');
      }
    } catch (error) {
      console.error('Error adding text:', error);
      setResults('Error adding text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const findSimilar = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const searchVector = await textToVector(inputText);
      if (!searchVector) return;

      const similarities = vectors.map((vector) => ({
        text: vector.content,
        similarity: cosineSimilarity(searchVector, vector.vector)
      }));

      similarities.sort((a, b) => b.similarity - a.similarity);

      setResults(similarities.map(s => 
        `${s.text} (similarity: ${(s.similarity * 100).toFixed(2)}%)`
      ).join('\n'));

      const allVectors = [...vectors.map(v => v.vector), searchVector];
      updateVisualization(allVectors);
      
      setTimeout(() => {
        updateVisualization(vectors.map(v => v.vector));
      }, 2000);

    } catch (error) {
      console.error('Error finding similar texts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatResults = (text: string) => {
    return text.split('\n').map(line => {
      if (line.includes('</think>')) {
        return {
          text: line.replace('</think>', '').trim(),
          isThinking: true
        };
      }
      return {
        text: line,
        isThinking: false
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{t.vectorDb.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4"> 
            {t.vectorDb.howItWorks}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t.vectorDb.desc}
          </p>
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter a sentence..."
              className="flex-1 p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addText}
              disabled={loading || ragLoading}
              className="px-5 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.vectorDb.addText}
            </button>
            <button
              onClick={findSimilar}
              disabled={loading || ragLoading}
              className="px-5 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.vectorDb.searchSimilar}
            </button>
          </div>
        </div>

        <div 
          ref={vizRef}
          className="w-full h-64 border border-gray-200 dark:border-gray-700 rounded-lg mb-6 relative bg-gray-50 dark:bg-gray-800"
        >
          {points.map((point, index) => (
            <div
              key={index}
              className="absolute w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-150 hover:z-10"
              style={{
                left: point.x + 'px',
                top: point.y + 'px'
              }}
              title={point.text}
            />
          ))}
          {(loading || ragLoading) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        <div className="overflow-auto max-h-96 rounded-md">
          <pre className="whitespace-pre-wrap break-words text-sm p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            {formatResults(results).map((line, index) => (
              <div 
                key={index} 
                className={`${
                  line.isThinking 
                    ? 'text-purple-600 dark:text-purple-400 italic font-light'
                    : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                {line.text}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default VectorDbDemo;