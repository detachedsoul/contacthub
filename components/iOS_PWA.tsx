"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/icon.jpeg";
import { useState, useEffect } from "react";
import { ShareIcon, XIcon } from "lucide-react";

const IOSPWA = () => {
	const [showPrompt, setShowPrompt] = useState(false);
	const [showInstructionsPrompt, setShowInstructionsPrompt] = useState(true);
	const [showInstructions, setShowInstructions] = useState(false);

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
		<>
			<div
				className={`flex items-center gap-4 fixed w-full top-0 justify-between bg-brand-black text-white p-2 transition-all duration-300 ease-in-out ${
					showInstructionsPrompt
						? "opacity-100 z-[1024]"
						: "opacity-0 -z-[1024]"
				}`}
			>
				<div className="flex items-center gap-2">
					<Image
						className="rounded-lg w-14 h-auto"
						src={Logo}
						alt="ContactHub"
					/>

					<p className="text-xs">
						Install this app on your iPhone and enjoy quicker
						access!
					</p>
				</div>

				<button
					className="btn w-auto inline-block shrink-0 text-sm"
					type="button"
					onClick={() => {
						setShowInstructions(true);
						setShowInstructionsPrompt(false);
					}}
				>
					Install
				</button>

				<button
					type="button"
					aria-label="Close PWA installation prompt"
					onClick={handleDismiss}
				>
					<XIcon strokeWidth={1.2} />
				</button>
			</div>

			<div
				className={`fixed bottom-0 flex flex-col place-content-end bg-brand-black/50 backdrop-blur w-full h-svh transition-all duration-300 ease-in-out ${
					showInstructions
						? "opacity-100 z-[1024]"
						: "opacity-0 -z-[1024]"
				}`}
			>
				<div className="bg-brand-black p-8 w-full h-auto rounded-t-3xl grid gap-6">
					<div className="flex items-center justify-between gap-4">
						<p>Install the app</p>

						<button
							type="button"
							aria-label="Close PWA installation prompt"
							onClick={() => {
								setShowInstructions(false);
								setShowInstructionsPrompt(false);
							}}
						>
							<XIcon strokeWidth={1.2} />
						</button>
					</div>

					<div className="flex items-center gap-6 bg-brand-white/10 p-4 rounded-xl">
						<Image
							className="w-16 h-auto rounded-lg"
							src={Logo}
							alt="ContactHub"
						/>

						<div>
							<p>ContactHub</p>

							<Link
								className="text-lime-500 text-sm decoration-wavy underline-offset-4 hover:underline"
								href="https://contacthub.com.ng/"
							>
								contacthub.com.ng
							</Link>
						</div>
					</div>

					<ul className="space-y-4 list-decimal pl-8">
						<li className="text-sm leading-loose">
							<p className="flex items-center">
								Press
								<span className="py-1 px-1.5 bg-lime-700/50 rounded mx-2">
									<ShareIcon size={18} />
								</span>{" "}
								in the browser menu
							</p>
						</li>

						<li className="text-sm leading-loose">
							Scroll down and tap{" "}
							<span className="bg-lime-700/50 p-1">
								Add to Home Screen
							</span>
						</li>

						<li className="text-sm leading-loose">
							Look for the{" "}
							<Image
								className="w-8 bg-red-500 rounded-lg h-auto inline-block"
								src={Logo}
								alt="ContactHub"
							/>{" "}
							icon on your home screen
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default IOSPWA;
