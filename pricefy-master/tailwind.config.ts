/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: {
			DEFAULT: "#1DB954", // Spotify Green as the main primary color
			hover: "#1ED760",   // Lighter green for hover states
			dark: "#179443",    // Darker green for pressed/active states
		  },
		  secondary: "#181818", // Spotify’s secondary panel background
		  "gray-200": "#B3B3B3", // Light gray for secondary text/icons
		  "gray-300": "#A7A7A7", // Slightly darker gray for subtle accents
		  "gray-500": "#535353", // Mid-gray for less prominent text
		  "gray-600": "#404040", // Darker gray for hierarchy
		  "gray-700": "#282828", // Dark gray for cards or containers
		  "gray-900": "#121212", // Spotify’s main background color
		  "white-100": "#FFFFFF", // Pure white for primary text
		  "white-200": "#F5F5F5", // Off-white for subtle highlights
		  "black-100": "#000000", // Pure black for deep contrast (used sparingly)
		  "neutral-black": "#0A0A0A", // Near-black for depth
		},
		boxShadow: {
		  xs: "0px 2px 8px rgba(0, 0, 0, 0.2)", // Slightly stronger shadow for Spotify’s depth
		},
		maxWidth: {
		  "10xl": "1440px",
		},
		fontFamily: {
		  inter: ["Inter", "sans-serif"], // Spotify uses a clean sans-serif; Inter works well
		  spaceGrotesk: ["Space Grotesk", "sans-serif"], // Optional bold alternative
		},
		borderRadius: {
		  10: "8px", // Spotify uses slightly softer corners (8px is closer to their style)
		},
	  },
	},
	plugins: [],
  };