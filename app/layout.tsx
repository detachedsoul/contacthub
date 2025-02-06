import AndroidPWA from "@/components/AndroidPWA";
import IOSPWA from "@/components/iOS_PWA";
import { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const APP_NAME = "ContactHub";
const APP_DEFAULT_TITLE = "ContactHub | Home";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Get more WhatsApp viewers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
    },
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: "summary",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
};

export const viewport: Viewport = {
	themeColor: "#cef006",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <html lang="en">
            <head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="ContactHub" />
                <link rel="apple-touch-icon" href="/icons2/icon-512-maskable.png" />
            </head>
			<body
				className={`${geistSans.className} ${geistMono.className} antialiased bg-brand-black text-brand-white selection:bg-brand-lime selection:text-white break-words [word-break:break-word] [word-wrap:break-word]`}
			>
				{children}

				<Toaster
					containerStyle={{
						zIndex: 9999,
					}}
				/>

				<AndroidPWA />
				<IOSPWA />
			</body>
		</html>
	);
}
