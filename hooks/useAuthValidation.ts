"use client";

import errorToast from "@/utils/error-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkUserIsLoggedIn } from "@/services/user-service";

const useAuthValidation = () => {
	const [isValid, setIsValid] = useState<boolean | null>(null);
	const router = useRouter();

	const validateCredentials = async () => {
		const userDetails = localStorage.getItem("user-details");
		const { id, email } = userDetails ? JSON.parse(userDetails) : {};

		if (!id || !email) {
			setIsValid(false);
			return;
		}

		try {
            const res = await checkUserIsLoggedIn({ id: id, email: email });

            if (typeof res === "string") {
                localStorage.removeItem("user-details");
                errorToast(res);
            }

			setIsValid(true);

		} catch (error) {
            errorToast(String(error));

			setIsValid(false);
		}
	};

	useEffect(() => {
		validateCredentials();

        const interval = setInterval(() => {
			validateCredentials();
		}, 120000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
        if (isValid === false) {
            errorToast("Your session has expired. Please login to continue.");

            router.replace("/sign-in");
		}
	}, [isValid, router]);

	return isValid;
};

export default useAuthValidation;
