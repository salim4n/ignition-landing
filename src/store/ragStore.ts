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

// Variables globales pour assurer la persistence entre les composants
let globalVectors: RagVector[] = [];
let isGlobalInitialized = false;
let isGlobalFetching = false;

const useRagStoreBase = create<RagState>((set, get) => ({
	vectors: globalVectors,
	loading: false,
	initialized: isGlobalInitialized,
	setVectors: (vectors) => {
		globalVectors = vectors;
		set({ vectors });
	},
	addVector: (vector) => {
		globalVectors = [...globalVectors, vector];
		set((state) => ({ vectors: [...state.vectors, vector] }));
	},
	clearVectors: () => {
		globalVectors = [];
		set({ vectors: [] });
	},
	fetchVectors: async () => {
		// Ne fetch que si ce n'est pas déjà initialisé et pas en cours de chargement
		if (!get().initialized && !isGlobalFetching) {
			isGlobalFetching = true;
			set({ loading: true });
			try {
				const response = await fetch(vector_url);
				if (!response.ok) {
					throw new Error("Erreur lors de la récupération des vecteurs");
				}
				const data = await response.json();
				globalVectors = data;
				isGlobalInitialized = true;
				set({ vectors: data, initialized: true });
			} catch (error) {
				console.error("Erreur:", error);
				isGlobalInitialized = true; // Considérer comme initialisé même en cas d'erreur
				set({ initialized: true });
			} finally {
				set({ loading: false });
				isGlobalFetching = false;
			}
		}
	},
}));

const useRagStore = () => {
	const store = useRagStoreBase();

	// Utiliser les vecteurs globaux si déjà initialisés
	useEffect(() => {
		if (isGlobalInitialized && globalVectors.length > 0 && store.vectors.length === 0) {
			store.setVectors(globalVectors);
			useRagStoreBase.setState({ initialized: true });
		} else if (!isGlobalInitialized && !isGlobalFetching) {
			store.fetchVectors();
		}
	}, []);

	return store;
};

export default useRagStore;
