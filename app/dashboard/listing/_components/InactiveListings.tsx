import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

const InactiveListings = () => {
	return (
		<section className="space-y-4 text-center">
			<Image
				className="size-20 mx-auto rounded-full border border-lime-500/20 ring-1 ring-offset-4 ring-offset-brand-black ring-lime-500/50 animate-floatBounce"
				src={UserImage}
				alt="Wisdom"
			/>

			<h1 className="text-xl animate-pulse text-lime-500">
				You don’t have any Inactive Listing
			</h1>

			<p>
				Want to get more views and addups? List your profile and start
				getting friends! Every time someone adds you, points will be
				deducted.
			</p>

			<Link
				className="btn flex items-center gap-1 place-content-center transition-all hover:gap-2"
				href="/dashboard/listing/add"
			>
				Link my profile <ArrowUpRightIcon strokeWidth={1.5} />
			</Link>
		</section>
	);
};

export default InactiveListings;
