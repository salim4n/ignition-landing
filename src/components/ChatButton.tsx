import { useState } from "react";
import { MessageCircle, X, Maximize2, Minimize2 } from "lucide-react";
import logo from "../../assets/ignition_flame.gif";
import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { HfInference } from "@huggingface/inference";
import useRagStore from "../store/ragStore";
import useSentenceEncoder from "../hook/useSentenceEncoder";

interface Message {
	text: string;
	isBot: boolean;
	thinking?: string;
}

const hf_token = import.meta.env.VITE_HF_API_KEY;

if (!hf_token) {
	console.error("HuggingFace API key not found in environment variables");
}

const ChatButton = ({ locale }: { locale: string }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [messagesBot, setMessagesBot] = useState<Message[]>([]);
	const [inputMessage, setInputMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const vectors = useRagStore().vectors;
	const { embedText, findTopKSimilar, modelLoading } = useSentenceEncoder();

	if (modelLoading) {
		console.log("Model loading...");
	}

	const extractThinkingAndResponse = (text: string) => {
		const thinkMatch = text.match(/<think>(.*?)<\/think>/s);
		const thinking = thinkMatch ? thinkMatch[1].trim() : "";
		const response = text.replace(/<think>.*?<\/think>/s, "").trim();
		return { thinking, response };
	};

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		// Add user message
		const userMessage: Message = { text: inputMessage, isBot: false };
		setMessagesBot((prev) => [...prev, userMessage]);
		setIsLoading(true);

		try {
			const client = new HfInference(hf_token);
			let accumulatedText = "";
			const inputMessageEmbedding = await embedText(inputMessage);
			const topDocs = await findTopKSimilar(inputMessage, vectors, 3);
			const input = `Tu es l'assistant officiel d'IgnitionAI, une agence spécialisée en intelligence artificielle.

EXPERTISE:
- Systèmes RAG pour l'enrichissement des LLMs avec des données propriétaires
- Développement de systèmes multi-agents intelligents
- Chatbots avancés avec compréhension contextuelle
- Modèle de vision par ordinateur avancé pour la reconnaissance de texte et la reconnaissance d'objets

CONSIGNES:
1. Base tes réponses principalement sur les documents fournis
2. Reste factuel et technique quand nécessaire
3. Pour les questions hors contexte, redirige vers le formulaire de contact
4. Ne fais pas de promesses spécifiques sur les délais ou les coûts
5. Si tu n'as pas l'information, suggère un appel de consultation sur ce lien : https://calendly.com/laimeche160
6. Tu réponds à l'utilisateur dans la même langue que celui-ci

INFORMATIONS DISPONIBLES:
Tu peux diriger l'utilisateur vers des liens externes
Voici les liens de redirections disponibles :
- https://www.pretorian-system.com/ : Applications de video surveillance gratuite que nous avons construites
- https://ignitionai-note.vercel.app/ : Notre documentation disponible pour tous
Tu peux utiliser le tag <code> pour mettre du code.
Langue: ${locale === "fr" ? "Français" : "English"}
Repond dans la langue de l'utilisateur : ${
				locale === "fr" ? "Français" : "English"
			}
Historique de conversation: ${messagesBot
				.map((message) => message.text)
				.join("\n")}
Dernier message utilisateur: ${inputMessage}
Message utilisateur embedding: ${inputMessageEmbedding}

Base de connaissance affinée selon l'input utilisateur : ${topDocs}

QUESTION: ${inputMessage}

RÉPONSE:`;
			for await (const chunk of client.chatCompletionStream({
				model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
				messages: [{ role: "user", content: input }],
				temperature: 0.5,
				stream: true,
			})) {
				if (chunk.choices && chunk.choices.length > 0) {
					const newContent = chunk.choices[0].delta.content || "";
					accumulatedText += newContent;

					const { thinking, response } =
						extractThinkingAndResponse(accumulatedText);

					setMessagesBot((prev) => {
						const newMessages = [...prev];
						newMessages[newMessages.length - 1] = {
							text: response,
							isBot: true,
							thinking: thinking,
						};
						return newMessages;
					});
				}
			}
		} catch (error) {
			console.error("Error:", error);
			// Ajouter un message d'erreur
			setMessagesBot((prev) => [
				...prev.slice(0, -1),
				{
					text: "Désolé, une erreur s'est produite. Veuillez réessayer.",
					isBot: true,
				},
			]);
		} finally {
			setIsLoading(false);
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
								{messagesBot.map((message, index) => (
									<div
										key={index}
										className={`flex items-start ${
											message.isBot ? "" : "justify-end"
										}`}>
										{message.isBot && <Bot className="w-6 h-6 mr-2 mt-1" />}
										<div className="flex flex-col max-w-[80%]">
											{message.thinking && (
												<div className="mb-2 bg-gray-800 rounded-lg p-2 text-sm text-gray-300 border-l-2 border-blue-500">
													<div className="font-medium mb-1">Réflexion :</div>
													<ReactMarkdown
														className="prose prose-invert prose-sm max-w-none"
														components={{
															p: ({ node, ...props }) => (
																<p className="mb-2 last:mb-0" {...props} />
															),
														}}>
														{message.thinking}
													</ReactMarkdown>
												</div>
											)}
											<div
												className={`rounded-lg p-2 ${
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
																<ul
																	className="list-disc ml-4 mb-2"
																	{...props}
																/>
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
									</div>
								))}
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
