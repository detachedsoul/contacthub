import type { Config } from "tailwindcss";

export default {
	content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"brand-black": "#0a0a0a",
				"brand-white": "#ededed",
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
