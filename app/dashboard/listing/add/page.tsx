import { Metadata } from "next/types";
import AddListingForm from "./_components/AddListingForm";

export const metadata: Metadata = {
	title: "ContactHub | Add Listing",
	description: "Get listed on the ContactHub platform",
};

const Points = () => {
	return (
		<section className="grid gap-8">
            <h1 className="text-center text-xl">
                Get Lisited and Increase Your Views
            </h1>

			<AddListingForm />
		</section>
	);
};

export default Points;
