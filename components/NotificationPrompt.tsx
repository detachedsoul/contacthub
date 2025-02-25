"use client";

import Image from "next/image";
import Logo from "@/app/icon.png";
import useAuth from "@/hooks/useAuth";
import { requestNotificationPermission } from "@/utils/push-notification-config";
import { useState, useEffect } from "react";

const NotificationPrompt = () => {
    const { authDetails } = useAuth();

	const [showPrompt, setShowPrompt] = useState(false);

	useEffect(() => {
        const hasPrompted = localStorage.getItem("notifications_prompted");

        if (!hasPrompted) {
            setTimeout(() => setShowPrompt(true), 3000);

            setShowPrompt(true);
		}
	}, []);

	const handleEnableNotifications = async () => {
        setShowPrompt(false);

        await requestNotificationPermission(authDetails?.id ?? "");

        localStorage.setItem("notifications_prompted", "true");
	};

	const handleDismiss = () => {
        localStorage.setItem("notifications_prompted", "true");

		setShowPrompt(false);
	};

    return (
		<div
			className={`flex flex-col sm:flex-row items-center gap-2 fixed w-full top-0 justify-between bg-brand-black text-white p-2 transition-all duration-300 ease-in-out sm:w-4/5 sm:left-[10%] lg:w-1/2 lg:left-[25%] ${
				showPrompt ? "opacity-100 z-[9999]" : "opacity-0 -z-[9999]"
			}`}
		>
			<div className="flex items-center gap-4 sm:w-1/2">
				<Image
					className="rounded-lg w-14 h-auto"
					src={Logo}
					alt="ContactHub"
				/>

				<p className="text-xs">
					Enabe notifications and stay updated with important alerts
					and messages.
				</p>
			</div>

			<div className="flex gap-4">
				<button
					className="btn w-auto inline-block shrink-0 py-3 text-sm"
					type="button"
					onClick={handleEnableNotifications}
				>
					Enable
				</button>

				<button
					className="btn w-auto inline-block shrink-0 py-3 text-sm bg-red-500 border text-white hover:bg-red-600"
					type="button"
					onClick={handleDismiss}
				>
					Not Now
				</button>
			</div>
		</div>
	);
};

export default NotificationPrompt;
