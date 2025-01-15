import type { Config } from "tailwindcss";

export default {
	content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"brand-black": "#0a0a0a",
				"brand-white": "#ededed",
				"brand-lime": "#cef006",
			},
			backgroundImage: {
				"index-bg":
					"linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .7)), url('../public/index-bg.jpg')",
			},
			keyframes: {
				floatBounce: {
					"0%, 100%": {
						transform: "translateY(0)",
						easing: "ease-in-out",
					},
					"50%": {
						transform: "translateY(-5%)",
						easing: "ease-in-out",
					},
				},
			},
			animation: {
				floatBounce: "floatBounce 5s ease-in-out infinite",
			},
		},
	},
	plugins: [],
} satisfies Config;
