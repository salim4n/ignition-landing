import LanguageToggle from "./LanguageToggle";
import logo from "../../assets/ignition_flame.gif";

interface NavbarProps {
	locale: string;
	onLocaleChange: (locale: string) => void;
	t: any;
}

export default function Navbar({ locale, onLocaleChange, t }: NavbarProps) {
	const scrollToContact = () => {
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<div className="flex items-center space-x-2">
						<img src={logo} alt="ignition-flame" className="h-12 w-12" />
						<span className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent">
							IgnitionAI
						</span>
					</div>
					<div className="hidden md:flex space-x-8">
						<a
							href="#services"
							className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
							{t.nav.services}
						</a>
						<a
							href="#features"
							className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
							{t.nav.features}
						</a>
						<a
							href="#contact"
							className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
							{t.nav.contact}
						</a>
					</div>
					<div className="flex items-center space-x-4">
						<LanguageToggle
							currentLocale={locale}
							onLocaleChange={onLocaleChange}
						/>
						<button
							onClick={scrollToContact}
							className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
							{t.nav.getStarted}
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
