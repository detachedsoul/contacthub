import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ContactHub | Home",
	description: "Get more WhatsApp viewers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.className} ${geistMono.className} antialiased bg-brand-black text-brand-white selection:bg-lime-500 selection:text-white break-words [word-break:break-word] [word-wrap:break-word]`}
			>
				{children}
			</body>
		</html>
	);
}
