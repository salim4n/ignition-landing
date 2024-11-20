import React from 'react';
import { X, Flame } from 'lucide-react';
import logo from "../../assets/ignition_flame.gif";

interface AboutModalProps {
	isOpen: boolean;
	onClose: () => void;
	t: any;
}

export default function AboutModal({ isOpen, onClose, t }: AboutModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideIn">
				<div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center">
					<div className="flex items-center space-x-2">
						<img src={logo} alt="ignition-flame" className="h-12 w-12" />
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
							{t.about.title} IgnitionAI
						</h3>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
						<X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
					</button>
				</div>
				<div className="p-6">
					<div className="prose dark:prose-invert max-w-none">
						<p className="text-gray-600 dark:text-gray-300">
							{t.about.description}
						</p>

						<h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
							{t.about.missionTitle}
						</h4>
						<p className="text-gray-600 dark:text-gray-300">
							{t.about.mission}
						</p>

						<h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
							{t.about.expertiseTitle}
						</h4>
						<p className="text-gray-600 dark:text-gray-300">
							{t.about.expertise}
						</p>

						<h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
							{t.about.approachTitle}
						</h4>
						<p className="text-gray-600 dark:text-gray-300">
							{t.about.approach}
						</p>
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
						{t.about.getInTouch}
					</button>
				</div>
			</div>
		</div>
	);
}