"use client";

import { useState, useEffect } from "react";

const IOSPWA = () => {
	const [showPrompt, setShowPrompt] = useState(false);

	const isIos = () =>
		/iPad|iPhone|iPod/.test(navigator.userAgent) &&
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		!(window as any).MSStream;

	const isInStandaloneMode = () =>
		window.matchMedia("(display-mode: standalone)").matches;

	useEffect(() => {
		if (isIos() && !isInStandaloneMode()) {
			const isPromptDismissed = localStorage.getItem("promptDismissed");

			if (!isPromptDismissed) {
				setShowPrompt(true);
			}
		}
	}, []);

	const handleDismiss = () => {
		setShowPrompt(false);

		localStorage.setItem("promptDismissed", "true");
	};

	if (!showPrompt) {
		return null;
	}

	return (
		<div className="fixed bottom-5 left-5 right-5 bg-white p-4 rounded-lg shadow-lg z-50">
			<p className="text-base text-center mb-8 text-gray-800">
				Install this app on your iPhone: Tap{" "}
				<span className="font-bold">Share</span> and then{" "}
				<span className="font-bold">Add to Home Screen</span>.
			</p>

			<button
				onClick={handleDismiss}
				className="bg-lime-500 text-white w-auto px-6 btn rounded-md cursor-pointer block mx-auto mt-2 ring-offset-brand-white"
				type="button"
				aria-label="Dismiss installation prompt"
			>
				Dismiss
			</button>
		</div>
	);
};

export default IOSPWA;
