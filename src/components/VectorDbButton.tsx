import { useState } from "react";
import { Database } from "lucide-react";
import VectorDbModal from "./VectorDbModal";
import { messages } from "../i18n/messages";

interface VectorDbButtonProps {
	locale: string;
}

const VectorDbButton: React.FC<VectorDbButtonProps> = ({ locale }) => {
	const [showModal, setShowModal] = useState(false);
	const t = messages[locale as keyof typeof messages];

	return (
		<div className="fixed bottom-4 left-4 z-50">
			<button
				onClick={() => setShowModal(true)}
				className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
				<Database className="w-6 h-6" />
			</button>

			{showModal && (
				<VectorDbModal
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					t={t}
				/>
			)}
		</div>
	);
};

export default VectorDbButton;
