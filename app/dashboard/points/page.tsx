import BuyPoints from "./_components/BuyPoints";
import Transactions from "./_components/Transactions";
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
