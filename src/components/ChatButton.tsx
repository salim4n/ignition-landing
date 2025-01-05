import { useState } from "react";
import { MessageCircle, X, Maximize2, Minimize2 } from "lucide-react";
import logo from "../../assets/ignition_flame.gif";
import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

console.log("prod ? ", import.meta.env.PROD);
const api_url: string = import.meta.env.PROD
	? "https://rust-chatbot-service.onrender.com/chat"
	: ("/api/chat" as const);

interface Message {
	text: string;
	isBot: boolean;
}

const ChatButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputMessage, setInputMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		// Add user message
		const userMessage: Message = { text: inputMessage, isBot: false };
		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);

		try {
			const response = await fetch(api_url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Origin: "https://ignitionai.fr",
				},
				mode: "cors",
				credentials: "omit",
				body: JSON.stringify({
					message: inputMessage,
				}),
			});

			console.log(response);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			const botMessage: Message = { text: data.answer, isBot: true };
			setMessages((prev) => [...prev, botMessage]);
		} catch (error) {
			console.error("Error:", error);
			const errorMessage: Message = {
				text: "Désolé, une erreur s'est produite. Veuillez réessayer plus tard.",
				isBot: true,
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
			setInputMessage("");
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{isOpen && (
				<div
					className={`mb-16 dark:bg-gray-900/80 backdrop-blur-md text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
						isExpanded
							? "fixed top-4 right-4 left-4 bottom-16 w-auto h-auto"
							: "w-72 sm:w-96 h-96"
					}`}>
					<div className="p-4 border-b flex justify-between items-center">
						<img src={logo} alt="ignition-flame" className="h-12 w-12" />
						<span className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent">
							IgnitionAI - Chatbot
						</span>
						<div className="flex gap-2">
							<button
								onClick={() => setIsExpanded(!isExpanded)}
								className="p-1 hover:bg-gray-100 rounded-full">
								{isExpanded ? (
									<Minimize2 className="w-5 h-5" />
								) : (
									<Maximize2 className="w-5 h-5" />
								)}
							</button>
							<button
								onClick={() => setIsOpen(false)}
								className="p-1 hover:bg-gray-100 rounded-full">
								<X className="w-5 h-5" />
							</button>
						</div>
					</div>
					<div className="flex flex-col h-[calc(100%-8rem)] overflow-hidden">
						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							<div className="flex flex-col space-y-4">
								{messages.map((message, index) => (
									<div
										key={index}
										className={`flex items-start ${
											message.isBot ? "" : "justify-end"
										}`}>
										{message.isBot && <Bot className="w-6 h-6 mr-2 mt-1" />}
										<div
											className={`rounded-lg p-2 max-w-[80%] ${
												message.isBot
													? "bg-blue-600 text-white"
													: "bg-gray-700 text-white ml-2"
											}`}>
											{message.isBot ? (
												<ReactMarkdown
													className="prose prose-invert prose-sm max-w-none"
													components={{
														p: ({ node, ...props }) => (
															<p className="mb-2 last:mb-0" {...props} />
														),
														ul: ({ node, ...props }) => (
															<ul className="list-disc ml-4 mb-2" {...props} />
														),
														ol: ({ node, ...props }) => (
															<ol
																className="list-decimal ml-4 mb-2"
																{...props}
															/>
														),
														li: ({ node, ...props }) => (
															<li className="mb-1" {...props} />
														),
													}}>
													{message.text}
												</ReactMarkdown>
											) : (
												message.text
											)}
										</div>
									</div>
								))}
								{isLoading && (
									<div className="flex items-center">
										<Bot className="w-6 h-6 mr-2" />
										<div className="bg-blue-600 text-white rounded-lg p-2">
											En train de réflechir...
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="p-4 border-t border-gray-600 mt-auto">
							<div className="flex flex-col sm:flex-row gap-2">
								<input
									type="text"
									value={inputMessage}
									onChange={(e) => setInputMessage(e.target.value)}
									onKeyPress={handleKeyPress}
									placeholder="Votre message..."
									className="flex-1 p-2 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
								/>
								<button
									onClick={handleSendMessage}
									disabled={isLoading}
									className={`w-full sm:w-auto whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 shadow-md transition duration-200 ${
										isLoading ? "opacity-50 cursor-not-allowed" : ""
									}`}>
									Envoyer
								</button>
							</div>
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
