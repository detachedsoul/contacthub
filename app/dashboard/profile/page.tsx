import EditUserDetails from "./_components/EditUserDetails";
import AccountActions from "./_components/AccountActions";
import Link from "next/link";
import { MicIcon } from "lucide-react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "ContactHub | Profile",
	description: "Manage your account",
};

const Profile = () => {
	return (
		<section className="grid gap-8">
			<h1 className="text-center text-xl">Manage your account</h1>

			<div className="rounded-2xl bg-gray-900 px-4 py-6 grid gap-8">
				<EditUserDetails />

				<Link
					className="flex items-center gap-4 group transition-all duration-300 ease-in-out hover:gap-6"
					href=""
				>
					<div className="rounded-full bg-gray-800 grid place-content-center p-4 transition-all duration-300 ease-in-out group-hover:ml-4 group-hover:bg-lime-500">
						<MicIcon />
					</div>

					<div className="text-left">
						<h2 className="text-lime-500 font-medium">Support</h2>

						<p className="text-sm group-hover:pl-2 transition-all duration-300 ease-in-out">
							Contact our support team
						</p>
					</div>
				</Link>
			</div>

			<AccountActions />
		</section>
	);
};

export default Profile;
