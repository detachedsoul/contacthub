"use client";

import useAuthValidation from "@/hooks/useAuthValidation";
import Image from "next/image";
import Logo from "@/assets/single-logo.jpg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AuthCheck = ({ children }: { children: React.ReactNode; }) => {
	const pathname = usePathname();
	const isDetailsValid = useAuthValidation();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 5000);
	}, [pathname]);

	if (isLoading || isDetailsValid === null) {
		return (
			<div className="h-svh md:w-4/5 lg:w-1/2 md:mx-auto animate-pulse grid place-content-center bg-brand-lime">
				<Image
					className="w-1/2 mx-auto h-auto"
					src={Logo}
					alt="ContactHub"
				/>
			</div>
		);
	}

	if (isDetailsValid === true) {
        window.location.replace("/dashboard");

		return;
    }

    return children;
};

export default AuthCheck;
