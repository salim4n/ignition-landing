import React, { useState } from "react";
import {
	Bot,
	Brain,
	MessageSquare,
	Zap,
	Database,
	Shield,
	Network,
	Github,
	Linkedin,
	BookOpen,
} from "lucide-react";
import { messages } from "./i18n/messages";
import Navbar from "./components/Navbar";
import ServiceCard from "./components/ServiceCard";
import ContactForm from "./components/ContactForm";
import ServiceModal from "./components/ServiceModal";
import AboutModal from "./components/AboutModal";
import logo from "../assets/ignition_flame.gif";
import VectorDbModal from "./components/VectorDbModal";
import ChatButton from "./components/ChatButton";
import VectorDbButton from "./components/VectorDbButton";
import useTelegram from "./hooks/useTelegram";
import useRagStore from "./store/ragStore";

function App() {
	const [locale, setLocale] = React.useState("fr");
	const [selectedService, setSelectedService] = useState<string | null>(null);
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const [showVectorDbModal, setShowVectorDbModal] = useState(false);
	const t = messages[locale as keyof typeof messages];
	useTelegram();
	const { vectors, loading } = useRagStore();

	const scrollToContact = () => {
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
			<Navbar locale={locale} onLocaleChange={setLocale} t={t} />

			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1e293b] py-32 overflow-hidden">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
				<div className="max-w-7xl mx-auto px-4 relative">
					<div className="text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
							<span className="text-blue-400 text-sm font-medium">🚀 Solutions IA sur mesure</span>
						</div>
						<h1 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
							{t.hero.title}
						</h1>
						<p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
							{t.hero.subtitle}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<button
								onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
								className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
							>
								{t.hero.getStarted || "Commencer votre projet"}
							</button>
							<button
								onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
								className="px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white font-semibold rounded-lg backdrop-blur-sm hover:bg-white/5 transition-all duration-200"
							>
								{t.hero.learnMore || "En savoir plus"}
							</button>
						</div>
					</div>
				</div>
			</section>


			{/* Services Section */}
			<section id="services" className="py-24 px-4 bg-gradient-to-b from-[#0a192f] to-[#1e293b]">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
							{t.services.title}
						</h2>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							Découvrez nos solutions d'intelligence artificielle conçues pour transformer votre entreprise
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						<ServiceCard
							Icon={Brain}
							title={t.services.rag.title}
							description={t.services.rag.description}
							onClick={() => setSelectedService("rag")}
						/>
						<ServiceCard
							Icon={Bot}
							title={t.services.chatbots.title}
							description={t.services.chatbots.description}
							onClick={() => setSelectedService("chatbots")}
						/>
						<ServiceCard
							Icon={MessageSquare}
							title={t.services.llm.title}
							description={t.services.llm.description}
							onClick={() => setSelectedService("llm")}
						/>
						<ServiceCard
							Icon={Network}
							title={t.services.agents.title}
							description={t.services.agents.description}
							onClick={() => setSelectedService("agents")}
						/>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
							{t.features.title}{" "}
							<span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
								IgnitionAI
							</span>
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
							Des technologies de pointe pour des résultats exceptionnels
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
							<div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
								<Zap className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
								{t.features.fast.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
								{t.features.fast.description}
							</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
							<div className="h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
								<Database className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
								{t.features.scalable.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
								{t.features.scalable.description}
							</p>
						</div>
						<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
							<div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
								<Shield className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
								{t.features.secure.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
								{t.features.secure.description}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section with Contact Form */}
			<section id="contact" className="py-24 px-4 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1e293b]">
				<div className="max-w-4xl mx-auto text-center">
					<div className="mb-12">
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
							{t.cta.title}
						</h2>
						<p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
							{t.cta.subtitle}
						</p>
					</div>
					<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
						<ContactForm t={t} />
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer id="footer" className="bg-gray-900 text-gray-400 py-16 px-4 pb-24">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-4 gap-8 mb-12">
						<div>
							<div className="flex items-center space-x-2 mb-4">
								<img src={logo} alt="ignition-flame" className="h-12 w-12" />
								<span className="text-xl font-bold bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent">
									IgnitionAI
								</span>
							</div>
							<p className="text-gray-300 leading-relaxed">{t.footer.tagline}</p>
						</div>
						
						<div>
							<h4 className="text-white font-semibold mb-4">
								{t.footer.services}
							</h4>
							<ul className="space-y-3">
								<li className="hover:text-blue-400 transition-colors cursor-pointer">{t.services.rag.title}</li>
								<li className="hover:text-blue-400 transition-colors cursor-pointer">{t.services.chatbots.title}</li>
								<li className="hover:text-blue-400 transition-colors cursor-pointer">{t.services.llm.title}</li>
								<li className="hover:text-blue-400 transition-colors cursor-pointer">{t.services.agents.title}</li>
							</ul>
						</div>
						
						<div>
							<h4 className="text-white font-semibold mb-4">
								{t.footer.company}
							</h4>
							<ul className="space-y-3">
								<li>
									<button
										onClick={() => setIsAboutOpen(true)}
										className="hover:text-blue-400 transition-colors">
										{t.footer.about}
									</button>
								</li>
								<li>
									<button
										onClick={scrollToContact}
										className="hover:text-blue-400 transition-colors">
										{t.footer.contact}
									</button>
								</li>
							</ul>
						</div>
						
						<div>
							<h4 className="text-white font-semibold mb-4">
								{t.footer.connect}
							</h4>
							<ul className="space-y-3">
								<li>
									<a
										href="https://www.github.com/IgnitionAI"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-blue-400 transition-colors flex items-center gap-2">
										<Github size={20} />
										<span>GitHub</span>
									</a>
								</li>
								<li>
									<a
										href="https://www.linkedin.com/company/ignitionai"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-blue-400 transition-colors flex items-center gap-2">
										<Linkedin size={20} />
										<span>LinkedIn</span>
									</a>
								</li>
								<li>
									<a
										href="https://ignitionai-note.vercel.app/"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-blue-400 transition-colors flex items-center gap-2">
										<BookOpen size={20} />
										<span>Blog</span>
									</a>
								</li>
								<li>
									<a
										href="https://www.pretorian-system.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-blue-400 transition-colors flex items-center gap-2">
										<Shield size={20} />
										<span>Pretorian System</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
					
					<div className="border-t border-gray-800 pt-8 text-center">
						<p className="text-gray-500">
							© 2024 IgnitionAI. Tous droits réservés.
						</p>
					</div>
				</div>
			</footer>

			{/* Fixed buttons container */}
			<div className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none">
				<div className="flex justify-between items-end">
					<div className="pointer-events-auto">
						{(!loading && <VectorDbButton locale={locale} />) || (
							<div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
								<img src={logo} alt="ignition-flame" className="h-8 w-8" />
							</div>
						)}
					</div>
					<div className="pointer-events-auto">
						{(!loading && <ChatButton locale={locale} />) || (
							<div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
								<img src={logo} alt="ignition-flame" className="h-8 w-8" />
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Service Modal */}
			{selectedService && (
				<ServiceModal
					isOpen={true}
					onClose={() => setSelectedService(null)}
					service={{
						title: t.services[selectedService as keyof typeof t.services]?.title || "",
						description:
							t.services[selectedService as keyof typeof t.services]
								?.description || "",
						details:
							t.services[selectedService as keyof typeof t.services]?.details || [],
						benefits:
							t.services[selectedService as keyof typeof t.services]?.benefits || [],
					}}
				/>
			)}

			{showVectorDbModal && (
				<VectorDbModal
					onClose={() => setShowVectorDbModal(false)}
					isOpen={false}
					t={t}
				/>
			)}
			{/* About Modal */}
			<AboutModal
				isOpen={isAboutOpen}
				onClose={() => setIsAboutOpen(false)}
				t={t}
			/>
		</div>
	);
}

export default App;
