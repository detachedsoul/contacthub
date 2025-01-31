"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const PWA: React.FC = () => {
	const [isActive, setIsActive] = useState(false);
	const [supportsPWA, setSupportsPWA] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [promptInstall, setPromptInstall] = useState<null | any>(null);

	useEffect(() => {
		if (isActive) {
			document.querySelector("body")!.style.overflow = "hidden";
		} else {
			document.querySelector("body")!.style.overflow = "auto";
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const handler = (e: any) => {
			e.preventDefault();

            const isPromptDismissed = localStorage.getItem("promptDismissed");

			if (!isPromptDismissed) {
				setIsActive(true);
				setSupportsPWA(true);
				setPromptInstall(e);
			}
		};

		window.addEventListener("beforeinstallprompt", handler);

		const appInstalledHandler = () => {
			setIsActive(false);
		};

		window.addEventListener("appinstalled", appInstalledHandler);

		return () => {
			window.removeEventListener("beforeinstallprompt", handler);

			window.removeEventListener("appinstalled", appInstalledHandler);
		};
	}, [isActive]);

	const installPWA = () => {
		if (!promptInstall) {
			return;
		}

		promptInstall.prompt();
	};

	const handleDismiss = () => {
		localStorage.setItem("promptDismissed", "true");
	};

	return supportsPWA ? (
		<div
			className={`fixed top-0 bottom-0 left-0 flex h-full w-full flex-col place-content-center bg-brand-black/50 backdrop-blur transition-all duration-500 ease-in-out ${
				isActive ? "opacity-100 z-[1024]" : "opacity-0 -z-[1024]"
			}`}
		>
			<div
				className={`ml-[5%] w-[calc(100%-10%)] rounded-2xl bg-brand-white text-brand-black text-center min-[500px]:ml-[calc((100%-60%)/2)] min-[500px]:w-3/5 min-[600px]:ml-[calc((100%-50%)/2)] min-[600px]:w-1/2 lg:ml-[calc((100%-30%)/2)] lg:w-[30%] ${
					isActive ? "z-[1024]" : ""
				}`}
			>
				<div className="flex items-center justify-between px-4 py-2 bg-gray-200 rounded-t-2xl">
					<h1 className="font-medium text-xl">Install PWA App</h1>

					<button
						className="bg-[#F2F2F2] shadow-2xl drop-shadow-xl hover:drop-shadow-none transition-shadow rounded-lg p-2"
						type="button"
						aria-label="Close modal"
						onClick={() => {
							handleDismiss();
							setIsActive(false);
						}}
					>
						<X size={20} />
					</button>
				</div>

				<div className="p-4 rounded-b-2xl bg-[#F2F2F2] space-y-6">
					<p>
						This site can be installed as an application. Click
						“Install” to install this site as a PWA.
					</p>

					<button
						className="btn hover:bg-brand-dark-purple transition-colors duration-300 ease-in rounded-lg ring-offset-brand-white"
						type="button"
						onClick={installPWA}
					>
						Install
					</button>
				</div>
			</div>
		</div>
	) : null;
};

export default PWA;
