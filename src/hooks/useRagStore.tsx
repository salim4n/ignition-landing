import { useState, useEffect } from "react";
import { create } from "zustand";

const vector_url: string = import.meta.env.PROD
	? "https://rust-chatbot-service.onrender.com/vectors"
	: ("/api/vectors" as const);

interface RagVector {
	id: string;
	category: string;
	timestamp: string;
	vector: number[];
	content: string;
}

interface RagState {
	vectors: RagVector[];
	setVectors: (vectors: RagVector[]) => void;
	addVector: (vector: RagVector) => void;
	clearVectors: () => void;
}

const useRagStoreBase = create<RagState>((set) => ({
	vectors: [],
	setVectors: (vectors) => set({ vectors }),
	addVector: (vector) =>
		set((state) => ({ vectors: [...state.vectors, vector] })),
	clearVectors: () => set({ vectors: [] }),
}));

const useRagStore = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { vectors, setVectors, addVector, clearVectors } = useRagStoreBase();

	const fetchVectors = async () => {
		setLoading(true);
		try {
			const response = await fetch(vector_url);
			if (!response.ok) {
				throw new Error("Erreur lors de la récupération des vecteurs");
			}
			const data = await response.json();
			setVectors(data);
		} catch (error) {
			console.error("Erreur:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchVectors();
	}, []);

	return {
		vectors,
		loading,
		addVector,
		clearVectors,
		refreshVectors: fetchVectors,
	};
};

export default useRagStore;
