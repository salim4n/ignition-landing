/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"blue-gray": "#000E38", // Ajoutez votre couleur personnalisée ici
			},
		},
	},
	plugins: [],
};