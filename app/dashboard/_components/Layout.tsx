"use client";

import NotificationPrompt from "@/components/NotificationPrompt";
import Header from "./Header";
import Footer from "./Footer";
import useAuthValidation from "@/hooks/useAuthValidation";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import SingleLogo from "@/assets/single-logo.jpg";
import Link from "next/link";
import successToast from "@/utils/success-toast";
import { messaging, onMessage } from "@/public/firebase";
import { useEffect } from "react";

const DashboardLayoutWrapper = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { authDetails } = useAuth();

    const isDetailsValid = useAuthValidation();

	useEffect(() => {
		if (!authDetails?.id || !messaging) return;

		if (messaging) {
			onMessage(messaging, (payload) => {
				successToast(
					`${payload.notification?.body}`,
				);
			});
		}
	}, [authDetails]);

	if (isDetailsValid === null) {
		return (
			<div className="h-svh md:w-4/5 lg:w-1/2 md:mx-auto grid place-content-center bg-brand-lime">
				<Image
					className="w-1/2 mx-auto h-auto"
					src={SingleLogo}
					alt="ContactHub"
				/>
			</div>
		);
	}

	if (isDetailsValid === false) {
		return (
			<div className="h-svh md:w-4/5 lg:w-1/2 md:mx-auto grid place-content-center gap-4 text-center">
				<p className="text-red-500 font-medium text-center text-lg">
					Your session has expired. Use the button below to sign in.
				</p>

				<Link
					className="btn inline-block mx-auto w-auto px-6 py-3"
					href="/sign-in"
				>
					Sign In
				</Link>
			</div>
		);
	}

	return (
		<>
            <NotificationPrompt />

			<Header />

			<main className="sm:w-4/5 lg:w-1/2 sm:mx-auto px-4 py-8 mb-16">
				{children}
			</main>

			<Footer />
		</>
	);
};

export default DashboardLayoutWrapper;
