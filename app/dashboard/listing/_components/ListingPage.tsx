/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActiveListings from "./ActiveListings";
import InactiveListings from "./InactiveListings";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { fetchUserListing } from "@/services/user-service";
import { useState } from "react";

export interface IListings {
    data: string | Parse.Object<Parse.Attributes>[] | undefined;
    isLoading: boolean;
    error: any;
};

const options = ["Active", "Inactive"];

const ListingPage = () => {
    const { authDetails } = useAuth();

    const [currentSelection, setCurrentSelection] = useState("Active Listings");

	const { data, error, isLoading } = useFetch(
		[
			"fetchUserListing",
			authDetails?.id ?? "",
			authDetails?.email ?? "",
			currentSelection,
		],
		() =>
			fetchUserListing({
				id: authDetails?.id ?? "",
				email: authDetails?.email ?? "",
				active: currentSelection === "Active Listings" ? true : false,
			}),
		{
			refreshInterval: 50000,
		},
	);

    return (
		<>
			<div className="sticky top-20 md:top-[3.55rem] pb-4 z-[1024] bg-brand-black/70 backdrop-blur -mb-4">
				<div className="flex items-center gap-4 bg-brand-white text-brand-black rounded-full p-2 md:w-4/5 md:mx-auto">
					{options.map((option) => (
						<button
							className={`rounded-full p-3 w-full transition-colors duration-300 ease-in-out ${
								currentSelection === option
									? "bg-lime-500 text-white"
									: "hover:bg-lime-500 hover:text-white"
							}`}
							type="button"
							onClick={() => setCurrentSelection(option)}
							key={option}
						>
							{option}
						</button>
					))}
				</div>
			</div>

			{currentSelection === "Active Listings" && (
				<ActiveListings
					data={data}
					isLoading={isLoading}
					error={error}
				/>
			)}
			{currentSelection === "Inactive Listings" && (
				<InactiveListings
					data={data}
					isLoading={isLoading}
					error={error}
				/>
			)}
		</>
	);
};

export default ListingPage;
