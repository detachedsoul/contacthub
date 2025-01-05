import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import { DatabaseIcon } from "lucide-react";

const Header = () => {
    return (
		<header className="flex items-center justify-between gap-4 p-4 md:py-1 sticky md:w-4/5 lg:w-1/2 md:mx-auto z-[1024] top-0 bg-brand-black/70 backdrop-blur text-brand-white">
			<div className="flex items-center gap-2">
				<Image
					className="rounded-full size-12"
					src={UserImage}
					alt="Wisdom"
				/>
				Hi, Wisdom
			</div>

			<span className="bg-lime-500 text-white rounded-full py-1.5 px-3 flex items-center gap-3 shrink-0">
				<DatabaseIcon size={20} />
				0P
			</span>
		</header>
	);
};

export default Header;
