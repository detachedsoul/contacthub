"use client";

import Image from "next/image";
import Logo from "@/assets/single-logo.jpg";
import useFetch from "@/hooks/useFetch";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import errorToast from "@/utils/error-toast";
import successToast from "@/utils/success-toast";
import Parse from "@/utils/parse-config";
// import Modal from "@/components/Modal";
import {
	DatabaseIcon,
	LocateIcon,
	// User,
	User2Icon,
	// UserCircle,
} from "lucide-react";
import {
	fetchListings,
	addPointsToUser,
	isNumberInAddedContactsRecords,
} from "@/services/user-service";
import { useEffect } from "react";
// import { useState } from "react";
// import Parse, { Attributes } from "parse/node";

const Contacts = () => {
	const { authDetails, setAuthDetails } = useAuth();

	const UserDetails = Parse.Object.extend("UserDetails");
	const userQuery = new Parse.Query(UserDetails);

    useEffect(() => {
		let isMounted = true; // Prevent setting state on unmounted component
		


		const fetchUser = async () => {
		  try {
			if (!authDetails?.id) return; // Ensure authDetails is available
	  
	  
			userQuery.equalTo("objectId", authDetails.id);
			const userData = await userQuery.first();
	  
			if (userData && isMounted) {
			  const userDetails = {
				id: userData.id,
				name: userData.get("name"),
				email: userData.get("email"),
				state: userData.get("state"),
				gender: userData.get("gender"),
				points: userData.get("points"),
			  };
	  
			  // Only update state if necessary to prevent infinite loops
			  if (JSON.stringify(authDetails) !== JSON.stringify(userDetails)) {
				setAuthDetails(userDetails);
				localStorage.setItem("user-details", JSON.stringify(userDetails));
			  }
			}
		  } catch (error) {
			console.error("Error fetching user:", error);
		  }
		};
	  
		fetchUser();
	  
		return () => {
		  isMounted = false; // Cleanup function to prevent memory leaks
		};
	  }, [authDetails]);


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

	// const [modalIsActive, setModalIsActive] = useState(false);
	// const [selectedContact, setSelectedContact] =
	// 	useState<Parse.Object<Attributes> | null>(null);

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
		<>
			<div
				className={`text-brand-black flex gap-4 items-center pb-8 md:pb-0 ${
					Array.isArray(data) && data.length < 1
						? "md:col-span-2"
						: ""
				}`}
			>
				<Image
					className="size-12 rounded-full"
					src={Logo}
					alt={authDetails?.name ?? "image"}
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
						className="text-black bg-brand-lime rounded-full py-2 px-2 text-sm"
						href="/dashboard/listing/add"
					>
						Get listed
					</Link>
				</div>
			</div>
			<div className="grid gap-4 md:gap-x-8 md:gap-y-12 md:grid-cols-2">
				{isLoading &&
					Array.from({ length: 5 }).map((_, index) => (
						<div
							className="mt-8 grid gap-4"
							key={index}
						>
							<div className="h-[200px] w-full rounded-lg bg-gray-300 animate-pulse"></div>

							<div className="space-y-2">
								<div className="h-4 w-32 rounded-lg bg-gray-400 animate-pulse"></div>

								<div className="h-4 w-full rounded-lg bg-gray-400 animate-pulse "></div>
							</div>

							<div className="flex gap-4 items-center">
								<div className="h-4 w-32 rounded-lg bg-gray-400 animate-pulse"></div>

								<div className="h-4 w-32 rounded-lg bg-gray-400 animate-pulse"></div>
							</div>

							<div className="h-12 w-full rounded-lg bg-gray-400 animate-pulse"></div>
						</div>

						// <div
						// 	className="text-brand-black flex gap-4 items-center"
						// 	key={index}
						// >
						// 	<div className="h-12 w-14 rounded-full bg-gray-300 animate-pulse"></div>

						// 	<div className="flex items-center justify-between w-full gap-4">
						// 		<div className="grid gap-2 text-left">
						// 			<div className="h-4 w-32 rounded-lg bg-gray-400 animate-pulse"></div>

						// 			<div className="h-2 w-16 rounded-lg bg-brand-lime animate-pulse"></div>
						// 		</div>

						// 		<div className="h-2 w-10 rounded-lg bg-brand-lime animate-pulse"></div>
						// 	</div>
						// </div>
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
					data.map((selectedContact, index) => (
						<div
							className="mt-8 grid gap-4"
							key={index}
							// onClick={() => {
							// 	setSelectedContact(selectedContact);
							// 	setModalIsActive(true);
							// }}
						>
							<Image
								className="w-full h-[200px] rounded-lg object-center"
								src={selectedContact?.get("image_url") ?? ""}
								width={100}
								height={300}
								alt={
									selectedContact?.get("display_name") ??
									"image"
								}
							/>

							<div className="space-y-0.5">
								<p className="font-medium text-lg pl-2">
									{selectedContact?.get("display_name")}
								</p>

								<p className="text-sm pl-2 italic">
									{selectedContact?.get("desc")}
								</p>
							</div>

							<div className="flex gap-4 items-center">
								<div className=" border border-gray-100 rounded-full flex items-center py-1 px-2 gap-1">
									<LocateIcon
										size={14}
										strokeWidth={2}
									></LocateIcon>
									<span className="font-medium text-xs">
										{selectedContact?.get(
											"preferred_location",
										) === "all"
											? "All States"
											: selectedContact?.get(
													"preferred_location",
											  )}
									</span>
								</div>

								<div className=" border border-gray-100 rounded-full flex items-center py-1 px-2 gap-1">
									<User2Icon
										size={14}
										strokeWidth={2}
									></User2Icon>

									<span className="font-medium text-xs">
										{selectedContact?.get(
											"preferred_gender",
										) === "All"
											? "All Genders"
											: selectedContact?.get(
													"preferred_gender",
											  )}
									</span>
								</div>
							</div>

							<Link
								className="text-center text-sm btn font-medium ring-offset-brand-white place-content-center flex items-center gap-2 h-12"
								href={`https://wa.me/${selectedContact?.get(
									"whatsapp_number",
								) ?? selectedContact?.get("group_link")}?text=Hi, nice to meet you. Please save my name as ${authDetails?.name}`
									
								// 	encodeURI(
								// 	`https://wa.me/${
								// 		selectedContact?.get(
								// 			"whatsapp_number",
								// 		) ?? selectedContact?.get("group_link")
								// 	}&text=Hi, nice to meet you. Please save my name as ${
								// 		authDetails?.name ?? ""
								// 	}`,
								// )
							}
								target="_blank"
								rel="noopener noreferrer"
								onClick={async () =>
									await updatePoints(
										selectedContact?.get(
											"whatsapp_number",
										) ?? selectedContact?.get("group_link"),
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

						// <div
						// 	className="text-brand-black flex gap-4 items-center"
						// 	key={
						// 		a.get("objectId") +
						// 		a.get("image_url") +
						// 		a.get("desc")
						// 	}
						// >
						// 	<Image
						// 		className="size-12 rounded-full cursor-pointer"
						// 		src={a.get("image_url")}
						// 		alt={a.get("display_name")}
						// 		width={80}
						// 		height={80}
						// 		onClick={() => {
						// 			setSelectedContact(a);
						// 			setModalIsActive(true);
						// 		}}
						// 	/>

						// 	<div className="flex items-center justify-between w-full gap-4 border-b-[0.031rem] border-gray-700 pb-4 md:pb-2">
						// 		<div
						// 			className="grid gap-0.5 md:gap-1 text-left cursor-pointer"
						// 			onClick={() => {
						// 				setSelectedContact(a);
						// 				setModalIsActive(true);
						// 			}}
						// 		>
						// 			<p className="md:text-sm text-brand-white shrink-0">
						// 				{a.get("display_name")}
						// 			</p>

						// 			<p className="text-sm md:text-xs text-gray-500 font-medium shrink-0">
						// 				{a.get("desc")}
						// 			</p>
						// 		</div>

						// 		<Link
						// 			className="text-center text-sm inline-flex items-center gap-2 text-brand-lime font-medium shrink-0"
						// 			href={encodeURI(
						// 				`https://wa.me/${
						// 					a.get("whatsapp_number") ??
						// 					a.get("group_link")
						// 				}`,
						// 			)}
						// 			target="_blank"
						// 			rel="noopener noreferrer"
						// 			onClick={async () =>
						// 				await updatePoints(
						// 					a.get("whatsapp_number") ??
						// 						a.get("group_link"),
						// 				)
						// 			}
						// 		>
						// 			Add +5{" "}
						// 			<DatabaseIcon
						// 				size={18}
						// 				strokeWidth={1.5}
						// 			/>
						// 		</Link>
						// 	</div>
						// </div>
					))}

				{!isLoading &&
					!error &&
					Array.isArray(data) &&
					data.length < 1 && (
						<p
							className={`text-brand-lime font-medium ${
								Array.isArray(data) && data.length < 1
									? "md:col-span-2 md:mx-auto md:w-4/5 text-center"
									: ""
							}`}
						>
							There are no listed accounts yet. Please check back
							later.
						</p>
					)}
			</div>

			{/* <Modal
				isOpen={modalIsActive}
				toggleIsOpen={setModalIsActive}
			>
				<div className="mt-8 grid gap-4">
					<Image
						className="w-full h-[200px] rounded-lg object-center"
						src={selectedContact?.get("image_url") ?? ""}
						width={100}
						height={300}
						alt={selectedContact?.get("display_name") ?? "image"}
					/>

					<div className="space-y-0.5">
						<p className="font-medium text-lg pl-2">
							{selectedContact?.get("display_name")}
						</p>

						<p className="text-sm pl-2 italic">
							{selectedContact?.get("desc")}
						</p>
					</div>

					<p className="text-lg pl-2">
						Preferred Location:{" "}
						<span className="font-medium">
							{selectedContact?.get("preferred_location") ===
							"all"
								? "All States"
								: selectedContact?.get("preferred_location")}
						</span>
					</p>

					<p className="text-lg pl-2">
						Preferred Gender:{" "}
						<span className="font-medium">
							{selectedContact?.get("preferred_gender") === "All"
								? "Both Genders"
								: selectedContact?.get("preferred_gender")}
						</span>
					</p>

					<Link
						className="text-center text-sm btn font-medium ring-offset-brand-white place-content-center flex items-center gap-2"
						href={encodeURI(
							`https://wa.me/${
								selectedContact?.get("whatsapp_number") ??
								selectedContact?.get("group_link")
							}`,
						)}
						target="_blank"
						rel="noopener noreferrer"
						onClick={async () =>
							await updatePoints(
								selectedContact?.get("whatsapp_number") ??
									selectedContact?.get("group_link"),
							)
						}
					>
						Add Up
						<DatabaseIcon
							size={18}
							strokeWidth={1.5}
						/>
					</Link>
				</div>
			</Modal> */}
		</>
	);
};

export default Contacts;
