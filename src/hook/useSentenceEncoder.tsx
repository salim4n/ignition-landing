import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";

type RagVector = {
	id: string;
	category: string;
	timestamp: string;
	vector: number[];
	content: string;
};

export default function useSentenceEncoder() {
	const [model, setModel] = useState<use.UniversalSentenceEncoder | null>(null);
	const [modelLoading, setModelLoading] = useState(true);

	useEffect(() => {
		const initModel = async () => {
			try {
				await tf.ready();
				console.log("TensorFlow.js ready");
				console.log("tf backend:", tf.getBackend());
				const loadedModel = await use.load();
				setModel(loadedModel);
				console.log("Model loaded");
				setModelLoading(false);
			} catch (error) {
				console.error("Error loading model:", error);
				setModelLoading(false);
			}
		};

		!model && initModel();

		return () => {
			tf.dispose();
		};
	}, []);

	const embedText = async (text: string) => {
		if (!model) alert("Model not loaded");
		const embeddings = model && (await model.embed([text]));
		const vector = embeddings && (await embeddings.array());
		embeddings && embeddings.dispose();
		return vector;
	};

	const cosineSimilarity = (vecA: number[], vecB: number[]) => {
		const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
		const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
		const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
		return dotProduct / (normA * normB);
	};

	const findTopKSimilar = async (
		query: string,
		vectors: RagVector[],
		k: number = 3,
	): Promise<RagVector[]> => {
		const queryEmbedding = await embedText(query);
		if (!queryEmbedding) return [];

		const similarities = vectors.map((vec) => {
			const similarity = tf.tidy(() => {
				const a = tf.tensor1d(queryEmbedding[0]);
				const b = tf.tensor1d(vec.vector);
				// Similarité cosinus
				return tf
					.div(
						tf.sum(tf.mul(a, b)),
						tf.mul(
							tf.sqrt(tf.sum(tf.square(a))),
							tf.sqrt(tf.sum(tf.square(b))),
						),
					)
					.arraySync();
			});
			return { ...vec, similarity };
		});

		// Trier et prendre les k plus similaires
		return similarities
			.sort((a, b) => {
				const simA = Array.isArray(a.similarity)
					? a.similarity[0]
					: a.similarity ?? 0;
				const simB = Array.isArray(b.similarity)
					? b.similarity[0]
					: b.similarity ?? 0;
				return (simB as any) - (simA as any);
			})
			.slice(0, k);
	};

	return { model, modelLoading, embedText, cosineSimilarity, findTopKSimilar };
}
