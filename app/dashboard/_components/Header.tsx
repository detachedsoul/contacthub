"use client";

import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import useAuth from "@/hooks/useAuth";
import { DatabaseIcon } from "lucide-react";

const Header = () => {
	const { authDetails } = useAuth();

	return (
		<header className="flex items-center justify-between gap-4 p-4 md:py-1 sticky md:w-4/5 lg:w-1/2 md:mx-auto z-[1024] top-0 bg-brand-black/70 backdrop-blur text-brand-white">
			<div className="flex items-center flex-wrap gap-2">
				<Image
					className="rounded-full size-12"
					src={UserImage}
					alt="Wisdom"
				/>
				Hi,{" "}
				{authDetails?.name ? (
					<>
						<span className="text-ellipsis md:hidden">
							{authDetails?.name.split(" ")[0]}
							{authDetails?.name.split(" ").length > 1 && "..."}
						</span>

						<span className="text-ellipsis hidden md:inline-block">
                            {authDetails?.name}
						</span>
					</>
				) : (
					<span className="h-4 w-20 rounded-lg bg-gray-200 animate-pulse"></span>
				)}
			</div>

			<span className="bg-brand-lime text-brand-black rounded-full py-1.5 px-3 flex items-center gap-3 shrink-0">
				<DatabaseIcon size={20} />
				{authDetails?.points}P
			</span>
		</header>
	);
};

export default Header;
