import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import Link from "next/link";
import { CircleDotIcon } from "lucide-react";

const Contacts = () => {
	return (
		<section className="grid gap-4 md:grid-cols-2">
			<div className="rounded-lg bg-brand-white text-brand-black border border-gray-300 grid">
				<div className="text-center p-4 space-y-2 grid place-content-center">
					<Image
						className="size-16 rounded-full mx-auto"
						src={UserImage}
						alt="Wwisdom"
					/>

					<p className="text-sm max-w-[80%] mx-auto">
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
					className="rounded-lg bg-brand-white text-brand-black border border-gray-300 grid"
					key={index}
				>
					<div className="text-center p-4 space-y-2 grid place-content-center">
						<Image
							className="size-16 rounded-full mx-auto"
							src={UserImage}
							alt="Wwisdom"
						/>

						<p className="text-sm max-w-[80%] mx-auto">
							OluwaTosinFaith
						</p>
					</div>

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
			))}
		</section>
	);
};

export default Contacts;
