import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import Link from "next/link";
import { CircleDotIcon } from "lucide-react";

const Contacts = () => {
	return (
		<section className="grid gap-2 md:gap-4 grid-cols-2">
			<div className="rounded-lg bg-brand-white text-brand-black border border-gray-300 grid min-h-[12.5rem]">
				<div className="text-center p-4 space-y-2 grid place-content-center">
					<Image
						className="size-16 rounded-full mx-auto"
						src={UserImage}
						alt="Wwisdom"
					/>

					<p className="text-sm max-w-[60%] mx-auto">
						List your profile
					</p>
				</div>

				<Link
					className="rounded-b-lg bg-lime-500 text-white hover:bg-lime-600 transition-colors duration-300 ease-in-out p-3 text-center w-full"
					href="/dashboard/listing/add"
				>
					Get listed
				</Link>
			</div>

			{Array.from({ length: 5 }).map((_, index) => (
				<div
					className="relative h-full min-h-[12.5rem]"
					key={index}
				>
					<div className="bg-brand-white text-brand-black rounded-t-lg grid items-start h-1/2">
						<p className="text-center text-sm max-w-[60%] py-4 mx-auto inline-block font-light z-10">
							OluwaTosinFaith
						</p>
					</div>

					<div className="bg-white/100 text-brand-black rounded-b-lg grid items-end h-1/2">
						<button
							className="text-center text-sm max-w-[60%] my-4 mx-auto inline-flex items-center gap-2 text-lime-500 z-10 font-medium"
							type="button"
						>
							Add +5{" "}
							<CircleDotIcon
								size={18}
								strokeWidth={1.5}
							/>
						</button>
					</div>

					<div className="h-full grid place-content-center absolute inset-0">
						<Image
							className="size-16 rounded-full z-50"
							src={UserImage}
							alt="Wisdom"
						/>
					</div>
				</div>
			))}
		</section>
	);
};

export default Contacts;
