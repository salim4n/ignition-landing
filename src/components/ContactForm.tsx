import React from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
  t: any;
}

const TELEGRAM_BOT_TOKEN = "7877279495:AAHCjrNBHtTNkqwhJAqgAycG6XrPOWbpBBg";
const CHAT_ID = "981600974";

export default function ContactForm({ t }: ContactFormProps) {
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [submitted, setSubmitted] = React.useState(false);

	const sendToTelegram = async (message: string) => {
		const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				chat_id: CHAT_ID,
				text: message,
			}),
		}).catch((error) => {
			console.error("Error sending message to Telegram:", error);
			alert(
				"Erreur lors de l'envoi du message. Veuillez réessayer ultérieurement.",
			);
		});
	};

	function json(url: string) {
		return fetch(url).then((res) => res.json());
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		let apiKey = "88c5f41b1cae33fea398516aa0c56af1b6df21ba68161d58f0c51637";
		const data = await json(`https://api.ipdata.co?api-key=${apiKey}`).catch(
			(error) => console.error(error),
		);

		// Récupérer les données du formulaire
		const formData = new FormData(e.target as HTMLFormElement);
		const message = `
    Nom: ${formData.get("firstName")} ${formData.get("lastName")}
    Email: ${formData.get("email")}
    Téléphone: ${formData.get("phone")}
    Entreprise: ${formData.get("company")}
    IP address: ${data.ip}
    Ville: ${data.city}
    Code Pays: ${data.country_code}
    Message: ${formData.get("message")}
  `;

		// Envoyer le message à Telegram
		await sendToTelegram(message);

		// Simuler l'envoi du formulaire
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsSubmitting(false);
		setSubmitted(true);
		(e.target as HTMLFormElement).reset();
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="firstName"
						className="block text-sm font-medium text-blue-100 mb-1">
						{t.contact.firstName}
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						required
						className="w-full px-4 py-2 rounded-lg bg-white/10 border border-blue-300/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
						placeholder={t.contact.firstNamePlaceholder}
					/>
				</div>
				<div>
					<label
						htmlFor="lastName"
						className="block text-sm font-medium text-blue-100 mb-1">
						{t.contact.lastName}
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						required
						className="w-full px-4 py-2 rounded-lg bg-white/10 border border-blue-300/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
						placeholder={t.contact.lastNamePlaceholder}
					/>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-blue-100 mb-1">
						{t.contact.email}
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="w-full px-4 py-2 rounded-lg bg-white/10 border border-blue-300/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
						placeholder={t.contact.emailPlaceholder}
					/>
				</div>
				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-blue-100 mb-1">
						{t.contact.phone}
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						className="w-full px-4 py-2 rounded-lg bg-white/10 border border-blue-300/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
						placeholder={t.contact.phonePlaceholder}
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="company"
					className="block text-sm font-medium text-blue-100 mb-1">
					{t.contact.company}
				</label>
				<input
					type="text"
					id="company"
					name="company"
					required
					className="w-full px-4 py-2 rounded-lg bg-white/10 border border-blue-300/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
					placeholder={t.contact.companyPlaceholder}
				/>
			</div>
			<div>
				<label
					htmlFor="message"
					className="block text-sm font-medium text-blue-100 mb-1">
					{t.contact.message}
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows={4}
					className="w-full px-4 py-2 rounded-lg bg-white/10 border border-blue-300/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
					placeholder={t.contact.messagePlaceholder}
				/>
			</div>
			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70">
				{isSubmitting ? (
					<div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
				) : (
					<>
						<Send className="h-5 w-5" />
						<span>{t.contact.submit}</span>
					</>
				)}
			</button>
			{submitted && (
				<p className="text-sm text-center text-blue-100 mt-4">
					{t.contact.success}
				</p>
			)}
		</form>
	);
}