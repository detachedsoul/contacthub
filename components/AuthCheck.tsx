"use client";

import useAuthValidation from "@/hooks/useAuthValidation";

const AuthCheck = ({ children }: { children: React.ReactNode; }) => {
	const isDetailsValid = useAuthValidation();

	if (isDetailsValid === null) {
        return null;
	}

	if (isDetailsValid === true) {
        window.location.replace("/dashboard");

		return;
    }

    return children;
};

export default AuthCheck;
