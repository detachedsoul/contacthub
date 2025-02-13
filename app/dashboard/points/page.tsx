"use client";

import useAuth from "@/hooks/useAuth";
import BuyPoints from "./_components/BuyPoints";
import Transactions from "./_components/Transactions";
// import { Metadata } from "next/types";
import { useEffect } from "react";
import Parse from "@/utils/parse-config";

// export const metadata: Metadata = {
// 	title: "ContactHub | Points",
// 	description: "Here's your Contacthub points",
// };

const Points = () => {

	const UserDetails = Parse.Object.extend("UserDetails");
	const userQuery = new Parse.Query(UserDetails);
	const { authDetails, setAuthDetails } = useAuth();

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
	  
			  console.log(userDetails);
	  
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
	  

    return (
		<section className="grid gap-4">
			<BuyPoints />

			<p className="text-sm">
				You can also earn more points by adding friends. You get 5
				points for every friend you add.
			</p>

			<div className="grid gap-2">
				<h2 className="text-xl font-medium text-brand-lime">
					Recent Transactions
                </h2>

                <Transactions />
			</div>
		</section>
	);
};

export default Points;
