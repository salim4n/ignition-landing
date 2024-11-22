import { Globe } from "lucide-react";

interface LanguageToggleProps {
	currentLocale: string;
	onLocaleChange: (locale: string) => void;
}

export default function LanguageToggle({
	currentLocale,
	onLocaleChange,
}: LanguageToggleProps) {
	return (
		<button
			onClick={() => onLocaleChange(currentLocale === "en" ? "fr" : "en")}
			className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			aria-label="Toggle language">
			<Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
			<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
				{currentLocale.toUpperCase()}
			</span>
		</button>
	);
}
