import React, { useState } from "react";
import {
	Bot,
	Brain,
	MessageSquare,
	Zap,
	Database,
	Shield,
	Network,
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
import useTelegram from "./hook/useTelegram";
import useRagStore from "./store/ragStore";

function App() {
	const [locale, setLocale] = React.useState("fr");
	const [selectedService, setSelectedService] = useState<string | null>(null);
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const [showVectorDbModal, setShowVectorDbModal] = useState(false);
	const t = messages[locale as keyof typeof messages];
	useTelegram();
	const { vectors, loading } = useRagStore();
	console.log("vectors", vectors);

	const scrollToContact = () => {
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
			<Navbar locale={locale} onLocaleChange={setLocale} t={t} />

			{/* Hero Section */}
			<section className="relative bg-gradient-to-b from-[#0a192f] to-[#112240] py-32">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
							{t.hero.title}
						</h1>
						<p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto">
							{t.hero.subtitle}
						</p>
					</div>
				</div>
			</section>

			{/* Video Section */}
			<section className="bg-[#0a192f] py-20">
				<div className="max-w-3xl mx-auto px-4">
					<div className="aspect-video">
						<iframe
							className="w-full h-full rounded-lg shadow-lg"
							src={`https://www.youtube.com/embed/${
								locale === "fr" ? "7JNGWMYKR5A" : "fZs7UTv3dMk"
							}`}
							title={
								locale === "fr"
									? "Présentation Ignition AI"
									: "Ignition AI Presentation"
							}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen></iframe>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="bg-[#0a192f]">
				{/* Services Section */}
				<section id="services" className="py-20 px-4">
					<div className="max-w-7xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
							{t.services.title}
						</h2>
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
				<section id="features" className="py-20 px-4 bg-white dark:bg-gray-800">
					<div className="max-w-7xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white ">
							{t.features.title}{" "}
							<span className="font-bold bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent">
								IgnitionAI
							</span>
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="flex flex-col items-center text-center p-6">
								<div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
									<Zap className="h-6 w-6 text-blue-500" />
								</div>
								<h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
									{t.features.fast.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									{t.features.fast.description}
								</p>
							</div>
							<div className="flex flex-col items-center text-center p-6">
								<div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
									<Database className="h-6 w-6 text-blue-500" />
								</div>
								<h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
									{t.features.scalable.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									{t.features.scalable.description}
								</p>
							</div>
							<div className="flex flex-col items-center text-center p-6">
								<div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
									<Shield className="h-6 w-6 text-blue-500" />
								</div>
								<h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
									{t.features.secure.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									{t.features.secure.description}
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section with Contact Form */}
				<section id="contact" className="py-20 px-4 bg-blue-gray">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-white mb-6">
							{t.cta.title}
						</h2>
						<p className="text-blue-100 mb-8">{t.cta.subtitle}</p>
						<ContactForm t={t} />
					</div>
				</section>
			</section>

			{/* Footer */}
			<footer id="footer" className="bg-gray-900 text-gray-400 py-12 px-4">
				<div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center space-x-2 mb-4">
							<img src={logo} alt="ignition-flame" className="h-12 w-12" />
							<span className="text-xl font-bold bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent">
								IgnitionAI
							</span>
						</div>
						<p>{t.footer.tagline}</p>
					</div>
					<div>
						<h4 className="text-white font-semibold mb-4">
							{t.footer.services}
						</h4>
						<ul className="space-y-2">
							<li>{t.services.rag.title}</li>
							<li>{t.services.chatbots.title}</li>
							<li>{t.services.llm.title}</li>
							<li>{t.services.agents.title}</li>
						</ul>
					</div>
					<div>
						<h4 className="text-white font-semibold mb-4">
							{t.footer.company}
						</h4>
						<ul className="space-y-2">
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
						<ul className="space-y-2">
							<li>
								<a
									href="https://www.linkedin.com/company/ignitionai"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-blue-400 transition-colors">
									LinkedIn
								</a>
							</li>
							<li>
								<a
									href="https://ignitionai-note.vercel.app/"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-blue-400 transition-colors">
									Blog
								</a>
							</li>
							<li>
								<a
									href="https://www.pretorian-system.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-blue-400 transition-colors">
									Pretorian System
								</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>

			{/* Service Modal */}
			{selectedService && (
				<ServiceModal
					isOpen={true}
					onClose={() => setSelectedService(null)}
					service={{
						title: t.services[selectedService as keyof typeof t.services].title,
						description:
							t.services[selectedService as keyof typeof t.services]
								?.description,
						details:
							t.services[selectedService as keyof typeof t.services]?.details,
						benefits:
							t.services[selectedService as keyof typeof t.services]?.benefits,
					}}
				/>
			)}

			{(!loading && <ChatButton locale={locale} />) || (
				<button className="fixed bottom-4 right-4 z-50">
					<img src={logo} alt="ignition-flame" className="h-12 w-12" />
				</button>
			)}
			{(!loading && <VectorDbButton locale={locale} />) || (
				<button className="fixed bottom-4 left-4 z-50">
					<img src={logo} alt="ignition-flame" className="h-12 w-12" />
				</button>
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
