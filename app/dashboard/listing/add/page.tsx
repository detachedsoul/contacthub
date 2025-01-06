import { CircleDotIcon, DatabaseIcon } from "lucide-react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "ContactHub | Add Listing",
	description: "Get listed on the ContactHub platform",
};

const Points = () => {
	return (
		<section className="space-y-4">
			<div className="rounded-2xl bg-gray-900 p-4 space-y-8">
				<p className="flex items-center gap-2">
					<DatabaseIcon size={20} />
					ContactHub points
				</p>

				<div className="space-y-2">
					<h2 className="text-sm">Total Points</h2>

					<p className="text-lg">0 Points</p>
				</div>

				<button
					className="inline-flex items-center gap-2 rounded-full py-2 px-4 border border-gray-300"
					type="button"
				>
					<CircleDotIcon size={20} />
					Buy Points
				</button>
			</div>

			<p>
				You can also earn more points by adding friends. You get 5
				points for every friend you add
			</p>

			<h2 className="text-lg text-lime-500">Recent Transactions</h2>
		</section>
	);
};

export default Points;
