import { SetStateAction, useEffect, useRef, useState } from 'react';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';


interface VectorDbDemoProps {
  t:any
}

const VectorDbDemo = ({t} : VectorDbDemoProps) => {
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState('');
  const vectorDatabase = useRef<number[][]>([]);
  const textDatabase = useRef<string[]>([]);
  

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

    initModel();

    return () => {
      if (model) {
        model.dispose();
      }
      tf.dispose();
    };
  }, []);

  const textToVector = async (text: string) => {
    if (!model) return null;
    const embeddings = await model.embed([text]);
    return embeddings.arraySync()[0];
  };

  const cosineSimilarity = (vecA: number[], vecB: number[]) => {
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (normA * normB);
  };

  const addText = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const vector = await textToVector(inputText);
      if (vector) {
        vectorDatabase.current.push(vector);
        textDatabase.current.push(inputText);
        updateVisualization();
        setInputText('');
        setResults(`Added: "${inputText}"`);
      }
    } catch (error) {
      console.error('Error processing text:', error);
    } finally {
      setLoading(false);
    }
  };

  const findSimilar = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const searchVector = await textToVector(inputText);
      if (searchVector) {
        const similarities = vectorDatabase.current.map((vector, index) => ({
          text: textDatabase.current[index],
          similarity: cosineSimilarity(searchVector, vector)
        }));

        similarities.sort((a, b) => b.similarity - a.similarity);
        
        const resultsHtml = similarities
          .map(item => `"${item.text}" (similarity: ${item.similarity.toFixed(3)})`)
          .join('\n');
        
        setResults(`Most similar to "${inputText}":\n${resultsHtml}`);
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateVisualization = () => {
    const viz = document.getElementById('visualization');
    if (!viz) return;
    
    viz.innerHTML = '';
    
    vectorDatabase.current.forEach((vector, index) => {
      const x = (vector.slice(0, 10).reduce((a, b) => a + b, 0) * 1000) % viz.offsetWidth;
      const y = (vector.slice(10, 20).reduce((a, b) => a + b, 0) * 1000) % viz.offsetHeight;
      
      const point = document.createElement('div');
      point.className = 'absolute w-2.5 h-2.5 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2';
      point.style.left = `${x}px`;
      point.style.top = `${y}px`;
      point.title = textDatabase.current[index];
      
      viz.appendChild(point);
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
              disabled={loading}
              className="px-5 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.vectorDb.addText}
            </button>
            <button
              onClick={findSimilar}
              disabled={loading}
              className="px-5 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.vectorDb.searchSimilar}
            </button>
          </div>
        </div>

        <div className="overflow-auto max-h-96 rounded-md">
          <pre className="whitespace-pre-wrap break-words text-sm p-4 bg-gray-50 rounded-md">
            {results}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default VectorDbDemo;