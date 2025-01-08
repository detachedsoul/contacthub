import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import Link from "next/link";
import { CircleDotIcon } from "lucide-react";

const Contacts = () => {
	return (
		<section className="grid gap-4 md:grid-cols-2">
			<div className="rounded-lg bg-brand-white text-brand-black border border-gray-300 flex gap-2 items-center">
				<Image
					className="w-1/3 h-full rounded-l-lg"
					src={UserImage}
					alt="Wwisdom"
				/>

				<div className="py-4 pr-4 grid gap-4">
					<p className="text-sm">
						List your profile
					</p>

					<Link
						className="text-lime-500"
						href="/dashboard/listing/add"
					>
						Get listed
					</Link>
				</div>
			</div>

			{Array.from({ length: 5 }).map((_, index) => (
				<div
					className="rounded-lg bg-brand-white text-brand-black border border-gray-300 flex gap-2 items-center"
					key={index}
				>
					<Image
						className="w-1/3 h-full rounded-l-lg"
						src={UserImage}
						alt="Wwisdom"
					/>

					<div className="py-4 pr-4 grid gap-4">
						<p className="text-sm">OluwaTosinFaith</p>

						<button
							className="text-center text-sm inline-flex items-center gap-2 text-lime-500 z-10 font-medium"
							type="button"
						>
							Add +5{" "}
							<CircleDotIcon
								size={18}
								strokeWidth={1.5}
							/>
						</button>
					</div>
				</div>
			))}
		</section>
	);
};

export default Contacts;
