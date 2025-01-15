"use client";

import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { IListings } from "./ListingPage";

const ActiveListings: React.FC<IListings> = ({ data, isLoading, error }) => {
    return (
		<section className="space-y-4 text-center md:w-4/5 md:mx-auto">
			{isLoading && (
				<div className="grid gap-8">
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							className="text-brand-black flex gap-4 items-center"
							key={index}
						>
							<div className="h-12 w-14 rounded-full bg-gray-300 animate-pulse"></div>

							<div className="flex items-center justify-between w-full gap-4">
								<div className="grid gap-2 text-left">
									<div className="h-4 w-32 rounded-lg bg-gray-400 animate-pulse"></div>

									<div className="h-2 w-16 rounded-lg bg-brand-lime animate-pulse"></div>
								</div>

								<div className="h-2 w-10 rounded-lg bg-brand-lime animate-pulse"></div>
							</div>
						</div>
					))}
				</div>
			)}

			{error && (
				<p className="text-red-500 font-medium text-xl">
					{String(error)}
				</p>
			)}

			{!isLoading && !error && Array.isArray(data) && data.length > 0 && (
				<div className="grid gap-8">
					{data.map((a) => (
						<div
							className="text-brand-black flex gap-4 items-center"
							key={
								a.get("objectId") +
								a.get("image_url") +
								a.get("desc")
							}
						>
							<Image
								className="size-12 rounded-full"
								src={a.get("image_url")}
								alt={a.get("display_name")}
								width={80}
								height={80}
							/>

							<div className="flex items-center justify-between w-full gap-4">
								<div className="grid gap-0.5 md:gap-1 text-left">
									<p className="md:text-sm text-brand-white shrink-0">
										{a.get("display_name")}
									</p>

									<p className="text-sm md:text-xs text-brand-lime font-medium shrink-0">
										{a.get("desc")}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{!isLoading && !error && Array.isArray(data) && data.length < 1 && (
				<>
					<Image
						className="size-20 mx-auto rounded-full border border-brand-lime/20 ring-1 ring-offset-4 ring-offset-brand-black ring-brand-lime/50 animate-floatBounce"
						src={UserImage}
						alt="Wisdom"
					/>

					<h1 className="text-xl animate-pulse text-brand-lime">
						You don’t have any Active Listing
					</h1>

					<p>
						Want to get more views and addups? List your profile and
						start getting friends! Every time someone adds you,
						points will be deducted.
					</p>

					<Link
						className="btn flex items-center gap-1 place-content-center transition-all hover:gap-2"
						href="/dashboard/listing/add"
					>
						Link my profile <ArrowUpRightIcon strokeWidth={1.5} />
					</Link>
				</>
			)}
		</section>
	);
};

export default ActiveListings;
