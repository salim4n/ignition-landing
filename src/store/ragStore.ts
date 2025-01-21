import { create } from "zustand";
import { useEffect } from "react";

const vector_url: string = import.meta.env.PROD
	? "https://rust-chatbot-service.onrender.com/vectors"
	: "/api/vectors";

interface RagVector {
	id: string;
	category: string;
	timestamp: string;
	vector: number[];
	content: string;
}

interface RagState {
	vectors: RagVector[];
	loading: boolean;
	initialized: boolean;
	setVectors: (vectors: RagVector[]) => void;
	addVector: (vector: RagVector) => void;
	clearVectors: () => void;
	fetchVectors: () => Promise<void>;
}

const useRagStoreBase = create<RagState>((set, get) => ({
	vectors: [],
	loading: false,
	initialized: false,
	setVectors: (vectors) => set({ vectors }),
	addVector: (vector) =>
		set((state) => ({ vectors: [...state.vectors, vector] })),
	clearVectors: () => set({ vectors: [] }),
	fetchVectors: async () => {
		// Ne fetch que si ce n'est pas déjà initialisé
		if (!get().initialized) {
			set({ loading: true });
			try {
				const response = await fetch(vector_url);
				if (!response.ok) {
					throw new Error("Erreur lors de la récupération des vecteurs");
				}
				const data = await response.json();
				set({ vectors: data, initialized: true });
			} catch (error) {
				console.error("Erreur:", error);
			} finally {
				set({ loading: false });
			}
		}
	},
}));

const useRagStore = () => {
	const store = useRagStoreBase();

	// Fetch uniquement au premier montage de l'application
	useEffect(() => {
		store.fetchVectors();
	}, []);

	return store;
};

export default useRagStore;
