import { X } from "lucide-react";

interface ServiceModalProps {
	isOpen: boolean;
	onClose: () => void;
	service: {
		title: string;
		description: string;
		details: string[];
		benefits: string[];
	};
}

export default function ServiceModal({
	isOpen,
	onClose,
	service,
}: ServiceModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideIn">
				<div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center">
					<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
						{service.title}
					</h3>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
						<X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
					</button>
				</div>
				<div className="p-6">
					<p className="text-gray-600 dark:text-gray-300 mb-6">
						{service.description}
					</p>

					<div className="mb-6">
						<h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
							Key Features
						</h4>
						<ul className="space-y-2">
							{service.details.map((detail, index) => (
								<li key={index} className="flex items-start">
									<span className="mr-2 text-blue-500">•</span>
									<span className="text-gray-600 dark:text-gray-300">
										{detail}
									</span>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
							Benefits
						</h4>
						<ul className="space-y-2">
							{service.benefits.map((benefit, index) => (
								<li key={index} className="flex items-start">
									<span className="mr-2 text-green-500">✓</span>
									<span className="text-gray-600 dark:text-gray-300">
										{benefit}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="p-6 bg-gray-50 dark:bg-gray-900/50">
					<button
						onClick={() => {
							onClose();
							document
								.getElementById("contact")
								?.scrollIntoView({ behavior: "smooth" });
						}}
						className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
						Get Started with {service.title}
					</button>
				</div>
			</div>
		</div>
	);
}
