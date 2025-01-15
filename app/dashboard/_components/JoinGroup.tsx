import Link from "next/link";
import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import { SkipForwardIcon, MegaphoneIcon } from "lucide-react";

const JoinGroup = () => {
    return (
		<section className="space-y-4">
			<Link
				className="rounded-lg flex group bg-brand-white text-brand-black border border-gray-300/50 hover:ring-1 ring-offset-2 hover:ring-gray-300/50 ring-offset-brand-black hover:bg-gray-300"
				href="/dashboard/listing/add"
			>
				<div className="bg-brand-white text-brand-black px-4 py-3.5 rounded-l-lg w-full flex items-center gap-2 text-sm">
					<MegaphoneIcon
						className="text-brand-lime"
						strokeWidth={1.5}
					/>
					List your group
				</div>

				<span className="rounded-r-lg px-4 py-3.5 bg-brand-lime text-white/100 group-hover:bg-lime-600 text-center grid place-content-center shrink-0 text-sm">
					Get listed
				</span>
			</Link>

			<div className="relative h-[40svh] min-h-[40svh]">
				<div className="bg-brand-white text-brand-black rounded-t-lg h-1/2 py-8"></div>

				<div className="bg-white/100 text-brand-black rounded-b-lg grid place-content-center h-1/2 py-8">
					<p className="text-center text-sm mx-auto inline-flex items-center gap-2 text-brand-lime font-medium z-10">
						The Billionaire’s Club
					</p>
				</div>

				<div className="h-full grid place-content-center absolute inset-0">
					<Image
						className="size-16 rounded-full z-50"
						src={UserImage}
						alt="Wisdom"
					/>
				</div>
			</div>

			<div className="flex items-center flex-wrap md:flex-nowrap gap-4">
				<button
					className="rounded-full p-3 w-full transition-colors duration-300 ease-in-out flex items-center place-content-center gap-2 text-center bg-brand-white text-brand-black border border-gray-300/50 hover:ring-1 ring-offset-2 hover:ring-gray-300/50 ring-offset-brand-black hover:bg-gray-300"
					type="button"
				>
					<SkipForwardIcon strokeWidth={1.5} />
					Skip
				</button>

				<button
					className="rounded-full p-3 w-full transition-colors duration-300 ease-in-out flex items-center place-content-center gap-2 text-center bg-brand-lime border border-brand-lime/50 hover:ring-1 ring-offset-2 hover:ring-brand-lime/50 ring-offset-brand-black hover:bg-lime-600"
					type="button"
				>
					Join group (+5 points)
				</button>
			</div>
		</section>
	);
};

export default JoinGroup;
