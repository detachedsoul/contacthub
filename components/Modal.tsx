"use client";

import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

interface IModal {
    isOpen: boolean;
    toggleIsOpen: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
};

const Modal: React.FC<IModal> = ({isOpen, toggleIsOpen, children}) => {
    useEffect(() => {
        if (isOpen) {
            document!.querySelector("body")!.style.overflowY = "hidden";
        } else {
            document!.querySelector("body")!.style.overflowY = "auto";
        }
    }, [isOpen]);

    return (
		<div
			className={`min-h-svh fixed inset-0 w-full bg-brand-black/70 backdrop-blur overflow-y-auto flex flex-col place-content-center p-4 transition-all duration-300 ease-in-out ${
				isOpen ? "opacity-100 z-[1024]" : "opacity-0 -z-50"
			}`}
		>
			<div className="md:w-1/2 sm:w-4/5 sm:mx-auto lg:w-1/3 bg-brand-white text-brand-black px-4 py-8 relative rounded-lg">
				<button
					className="bg-brand-lime text-brand-black p-1 hover:bg-lime-600 transition-colors duration-300 ease-in-out rounded-full absolute right-2 top-2"
					type="button"
					aria-label="Toggle modal"
					onClick={() => toggleIsOpen(!isOpen)}
				>
					<XIcon />
				</button>

				<div className="mt-4">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
