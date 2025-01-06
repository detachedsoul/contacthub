import BuyPoints from "./_components/BuyPoints";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "ContactHub | Points",
	description: "Here's your Contacthub points",
};

const Points = () => {
    return (
		<section className="grid gap-4">
            <BuyPoints />

			<p className="text-sm">
				You can also earn more points by adding friends. You get 5
				points for every friend you add
			</p>

			<h2 className="text-xl font-medium text-lime-500">
				Recent Transactions
			</h2>
		</section>
	);
};

export default Points;
