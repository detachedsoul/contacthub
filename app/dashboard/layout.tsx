import type { Metadata } from "next";
import DashboardLayoutWrapper from "./_components/Layout";

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
        <DashboardLayoutWrapper>
            {children}
        </DashboardLayoutWrapper>
	);
}
