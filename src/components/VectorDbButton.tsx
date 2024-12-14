import { useState, useEffect } from "react";
import { Database } from "lucide-react";
import VectorDbModal from "./VectorDbModal";
import { messages } from "../i18n/messages";

interface VectorDbButtonProps {
	locale: string;
}

const VectorDbButton: React.FC<VectorDbButtonProps> = ({ locale }) => {
	const [showModal, setShowModal] = useState(false);
	const [isNearFooter, setIsNearFooter] = useState(false);
	const t = messages[locale as keyof typeof messages];

	useEffect(() => {
		const handleScroll = () => {
			const footer = document.getElementById('footer');
			if (footer) {
				const footerTop = footer.getBoundingClientRect().top;
				const windowHeight = window.innerHeight;
				setIsNearFooter(footerTop - windowHeight < 100);
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial check

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className={`fixed transition-all duration-300 z-50 ${
			isNearFooter 
				? 'bottom-20 sm:bottom-4 right-4 sm:left-4' 
				: 'bottom-4 left-4'
		}`}>
			<button
				onClick={() => setShowModal(true)}
				className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
				<Database className="w-5 h-5 sm:w-6 sm:h-6" />
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
