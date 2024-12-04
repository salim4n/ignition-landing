import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import logo from "../../assets/ignition_flame.gif";
import { Bot } from "lucide-react";

const ChatButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{isOpen && (
				<div className="mb-4 dark:bg-gray-900/80 backdrop-blur-md  text-white rounded-lg shadow-lg w-72 sm:w-96 h-96">
					<div className="p-4 border-b flex justify-between items-center">
						<img src={logo} alt="ignition-flame" className="h-12 w-12" />
						<span className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent">
							IgnitionAI - Chatbot
						</span>
						<button
							onClick={() => setIsOpen(false)}
							className="p-1 hover:bg-gray-100 rounded-full">
							<X className="w-5 h-5" />
						</button>
					</div>
					<div className="p-4 h-[calc(100%-4rem)] overflow-y-auto flex flex-col">
						{/* Zone de messages */}
						<div className="flex-1 overflow-y-auto">
							{/* Exemple de messages */}
							<div className="mb-2 flex items-center">
								<Bot className="w-6 h-6 mr-2" />
								<span className="text-white bg-blue-600 rounded-lg p-2 shadow-md">
									ChatBot en construction ...
								</span>
							</div>
							{/* Ajoutez ici d'autres messages */}
						</div>

						{/* Champ de saisie et bouton d'envoi */}
						<div className="flex mt-4 border-t border-gray-600 pt-4">
							<input
								type="text"
								placeholder="Votre message..."
								className="flex-1 p-2 rounded-lg bg-transparent border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
							/>
							<button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 shadow-md transition duration-200">
								Envoyer
							</button>
						</div>
					</div>
				</div>
			)}

			<button
				onClick={() => setIsOpen(!isOpen)}
				className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 border-2 border-blue-700 hover:shadow-lg">
				<MessageCircle className="w-6 h-6" />
			</button>
		</div>
	);
};

export default ChatButton;
