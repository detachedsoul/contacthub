"use client";

import useAuth from "@/hooks/useAuth";
import errorToast from "@/utils/error-toast";
import successToast from "@/utils/success-toast";
import { deleteUser } from "@/services/user-service";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AccountAction = () => {
    const router = useRouter();
    const { authDetails, setAuthDetails } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    return (
		<div className="space-y-4">
			<button
				className="rounded-full p-3 w-full transition-colors duration-300 ease-in-out flex items-center place-content-center gap-2 text-center bg-lime-500 border border-lime-500/50 hover:ring-1 ring-offset-2 hover:ring-lime-500/50 ring-offset-brand-black hover:bg-lime-600"
                type="button"
                onClick={() => {
                    localStorage.removeItem("user-details");
                    setAuthDetails(null);

                    router.replace("/sign-in");
                }}
			>
				Logout
            </button>

            <button
				className="btn rounded-full p-3 w-full transition-colors duration-300 ease-in-out items-center place-content-center gap-2 text-center bg-red-500 border border-red-500/50 hover:ring-1 ring-offset-2 hover:ring-red-500/50 ring-offset-brand-black hover:bg-red-600"
                disabled={isLoading}
                type="button"
                onClick={async () => {
                    setIsLoading(true);

                    try {
                        const res = await deleteUser({
							id: authDetails?.id ?? "",
							email: authDetails?.email ?? "",
						});

                        if (typeof res === "string") {
                            errorToast(res);

                            return;
                        }

                        successToast("Account deleted successfully.");

                        localStorage.removeItem("user-details");
						setAuthDetails(null);

						router.replace("/sign-up");
                    } catch (error) {
                        errorToast(error as string)
                    } finally {
                        setIsLoading(false);
                    }
                }}
			>
				{isLoading ? "Deleting account..." : "Delete Account"}
			</button>
		</div>
	);
};

export default AccountAction;
