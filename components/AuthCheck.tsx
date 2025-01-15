"use client";

import useAuthValidation from "@/hooks/useAuthValidation";

const AuthCheck = ({ children }: { children: React.ReactNode; }) => {
	const isDetailsValid = useAuthValidation();

	if (isDetailsValid === null) {
		return (
			<div className="h-svh md:w-4/5 lg:w-1/2 md:mx-auto rounded-lg bg-gray-900/50 animate-pulse"></div>
		);
	}

	if (isDetailsValid === true) {
        window.location.replace("/dashboard");

		return;
    }

    return children;
};

export default AuthCheck;
