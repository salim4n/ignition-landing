import React from "react";
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
		<nav className="fixed w-full bg-white/80 dark:bg-[#0a192f]/90 backdrop-blur-md z-50 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					{/* Logo section */}
					<div className="flex items-center space-x-2">
						<img src={logo} alt="ignition-flame" className="h-8 w-8 sm:h-12 sm:w-12" />
						<span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent">
							IgnitionAI
						</span>
					</div>

					{/* Actions section */}
					<div className="flex items-center gap-2 sm:gap-4">
						<LanguageToggle
							currentLocale={locale}
							onLocaleChange={onLocaleChange}
						/>
						<button
							onClick={scrollToContact}
							className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium transition-colors duration-200 shadow-md hover:shadow-lg whitespace-nowrap">
							{t.nav.getStarted}
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
