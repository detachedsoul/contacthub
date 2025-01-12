import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import useFetch from "@/hooks/useFetch";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { CircleDollarSignIcon } from "lucide-react";
import { fetchListings } from "@/services/user-service";

const Contacts = () => {
	const { authDetails } = useAuth();

	const { data, error, isLoading } = useFetch(
		["fetchListings", authDetails?.id ?? "", authDetails?.email ?? ""],
		() =>
			fetchListings({
				id: authDetails?.id ?? "",
				email: authDetails?.email ?? "",
			}),
		{
			refreshInterval: 50000,
		},
	);

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

			{isLoading &&
				Array.from({ length: 5 }).map((_, index) => (
					<div
						className="text-brand-black flex gap-4 items-center"
						key={index}
					>
						<div className="h-12 w-14 rounded-full bg-gray-300 animate-pulse"></div>

						<div className="flex items-center justify-between w-full gap-4">
							<div className="grid gap-2 text-left">
								<div className="h-4 w-32 rounded-lg bg-gray-400 animate-pulse"></div>

								<div className="h-2 w-16 rounded-lg bg-lime-500 animate-pulse"></div>
							</div>

							<div className="h-2 w-10 rounded-lg bg-lime-500 animate-pulse"></div>
						</div>
					</div>
				))}

			{error && (
				<p className="text-red-500 font-medium text-xl">
					{String(error)}
				</p>
			)}

			{!isLoading &&
				!error &&
				Array.isArray(data) &&
				data.length > 0 &&
				data.map((a) => (
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

								<p className="text-sm md:text-xs text-lime-500 font-medium shrink-0">
									{a.get("desc")}
								</p>
							</div>

							<Link
								className="text-center text-sm inline-flex items-center gap-2 text-lime-500 font-medium shrink-0"
								href={`https://api.whatsapp.com/send/?phone=${
									a.get("whatsapp_number") ??
									a.get("group_link")
								}&text=Hi, nice to meet you. Please save my name as ${a.get(
									"display_name",
								)}&type=phone_number&app_absent=0`}
								target="_blank"
								rel="noopener noreferrer"
							>
								Add +5{" "}
								<CircleDollarSignIcon
									size={18}
									strokeWidth={1.5}
								/>
							</Link>
						</div>
					</div>
				))}

			{!isLoading && !error && Array.isArray(data) && data.length < 1 && (
                <p className="text-lime-500 font-medium">
                    There are no listed accounts yet. Please check back later.
                </p>
			)}
		</section>
	);
};

export default Contacts;
