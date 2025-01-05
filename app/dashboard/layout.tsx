import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
	title: "ContactHub | Dashboard",
	description: "Get more WhatsApp viewers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
            <Header />

            <main className="md:w-4/5 lg:w-1/2 md:mx-auto px-4 py-8 mb-16">
                {children}
            </main>

            <Footer />
		</>
	);
}
