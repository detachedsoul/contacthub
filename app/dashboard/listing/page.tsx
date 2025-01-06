import ListingPage from "./_components/ListingPage";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "ContactHub | View Listing",
	description: "View your listing",
};

const Listing = () => {
	return (
		<section className="grid gap-8">
			<ListingPage />
		</section>
	);
};

export default Listing;
