"use client";

import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";
import Logo from "@/assets/single-logo.jpg";
import useAuthValidation from "@/hooks/useAuthValidation";

const DashboardLayoutWrapper = ({children}: {children: React.ReactNode}) => {
    const isDetailsValid = useAuthValidation();

	if (isDetailsValid === null) {
		return (
            <div className="h-svh md:w-4/5 lg:w-1/2 md:mx-auto animate-pulse grid place-content-center bg-brand-lime">
                <Image className="w-1/2 mx-auto h-auto" src={Logo} alt="ContactHub" />
            </div>
		);
	}

	if (isDetailsValid === false) {
		return null;
	}

    return (
        <>
            <Header />

            <main className="md:w-4/5 lg:w-1/2 md:mx-auto px-4 py-8 mb-16">
                {children}
            </main>

            <Footer />
        </>
    );
};

export default DashboardLayoutWrapper;
