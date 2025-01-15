import Image from "next/image";
import UserImage from "@/assets/user.jpg";
import useFetch from "@/hooks/useFetch";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import errorToast from "@/utils/error-toast";
import successToast from "@/utils/success-toast";
import { DatabaseIcon } from "lucide-react";
import {
	fetchListings,
	addPointsToUser,
	isNumberInAddedContactsRecords,
} from "@/services/user-service";

const Contacts = () => {
	const { authDetails, setAuthDetails } = useAuth();

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

	const isEligibleForBonus = async (number: string) => {
		const isEligible = await isNumberInAddedContactsRecords({
			id: authDetails?.id ?? "",
			email: authDetails?.email ?? "",
			number: number,
		});

		return isEligible;
	};

	const updatePoints = async (number: string) => {
		const isEligible = await isEligibleForBonus(number);

		if (typeof isEligible === "string") {
			errorToast(isEligible);

			return;
		}

		if (isEligible) {
			return;
		}

		try {
			const res = await addPointsToUser({
				id: authDetails?.id ?? "",
				email: authDetails?.email ?? "",
			});

			if (typeof res === "string") {
				errorToast(res);

				return;
			}

			const userDetails = {
				id: res.id,
				name: res.get("name"),
				email: res.get("email"),
				state: res.get("state"),
				gender: res.get("gender"),
				points: res.get("points"),
			};

			localStorage.setItem("user-details", JSON.stringify(userDetails));

			successToast(
				`You have been gifted 5 more points. Total points is now ${res.get(
					"points",
				)}`,
			);

			setAuthDetails(userDetails);
		} catch (error) {
			errorToast(String(error));
		}
	};

	return (
		<div className="grid gap-4 md:gap-x-8 md:gap-y-12 md:grid-cols-2">
			<div
				className={`text-brand-black flex gap-4 items-center pb-8 md:pb-0 ${
					Array.isArray(data) && data.length < 1
						? "md:col-span-2"
						: ""
				}`}
			>
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

						<p className="text-sm md:text-xs text-brand-lime font-medium shrink-0">
							Get more views
						</p>
					</div>

					<Link
						className="text-brand-lime"
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

								<div className="h-2 w-16 rounded-lg bg-brand-lime animate-pulse"></div>
							</div>

							<div className="h-2 w-10 rounded-lg bg-brand-lime animate-pulse"></div>
						</div>
					</div>
				))}

			{error && (
				<p
					className={`text-red-500 font-medium ${
						Array.isArray(data) && data.length < 1
							? "md:col-span-2 md:mx-auto md:w-4/5 text-center"
							: ""
					}`}
				>
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

						<div className="flex items-center justify-between w-full gap-4 border-b-[0.031rem] border-gray-700 pb-4 md:pb-2">
							<div className="grid gap-0.5 md:gap-1 text-left">
								<p className="md:text-sm text-brand-white shrink-0">
									{a.get("display_name")}
								</p>

								<p className="text-sm md:text-xs text-gray-500 font-medium shrink-0">
									{a.get("desc")}
								</p>
							</div>

							<Link
								className="text-center text-sm inline-flex items-center gap-2 text-brand-lime font-medium shrink-0"
								href={`https://api.whatsapp.com/send/?phone=${
									a.get("whatsapp_number") ??
									a.get("group_link")
								}&text=Hi, nice to meet you. Please save my name as ${a.get(
									"display_name",
								)}&type=phone_number&app_absent=0`}
								target="_blank"
								rel="noopener noreferrer"
								onClick={async () =>
									await updatePoints(
										a.get("whatsapp_number") ??
											a.get("group_link"),
									)
								}
							>
								Add +5{" "}
								<DatabaseIcon
									size={18}
									strokeWidth={1.5}
								/>
							</Link>
						</div>
					</div>
				))}

			{!isLoading && !error && Array.isArray(data) && data.length < 1 && (
				<p
					className={`text-brand-lime font-medium ${
						Array.isArray(data) && data.length < 1
							? "md:col-span-2 md:mx-auto md:w-4/5 text-center"
							: ""
					}`}
				>
					There are no listed accounts yet. Please check back later.
				</p>
			)}
		</div>
	);
};

export default Contacts;
