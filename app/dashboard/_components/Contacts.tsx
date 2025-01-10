import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import Link from "next/link";
import { CircleDollarSignIcon } from "lucide-react";

const Contacts = () => {
	return (
		<section className="grid gap-8 md:grid-cols-2">
			<div className="text-brand-black flex gap-4 items-center">
				<Image
					className="size-12 rounded-full"
					src={UserImage}
					alt="Wwisdom"
				/>

				<div className="flex items-center justify-between w-full gap-4">
					<div className="grid gap-0.5 md:gap-1">
						<p className="md:text-sm text-brand-white shrink-0">
							List your profile
						</p>

						<p className="text-sm md:text-xs text-lime-500 font-medium shrink-0">
							Im new here
						</p>
					</div>

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
					className="text-brand-black flex gap-4 items-center"
					key={index}
				>
					<Image
						className="size-12 rounded-full"
						src={UserImage}
						alt="Wwisdom"
					/>

					<div className="flex items-center justify-between w-full gap-4">
						<div className="grid gap-0.5 md:gap-1">
							<p className="md:text-sm text-brand-white shrink-0">
								Madara
							</p>

							<p className="text-sm md:text-xs text-lime-500 font-medium shrink-0">
								Crypto
							</p>
						</div>

						<button
							className="text-center text-sm inline-flex items-center gap-2 text-lime-500 font-medium shrink-0"
							type="button"
						>
							Add +5{" "}
							<CircleDollarSignIcon
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
