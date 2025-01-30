"use client";

import Link from "next/link";
import { DatabaseIcon, HomeIcon, MegaphoneIcon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
	{
		routeName: "Explore",
		icon: HomeIcon,
		route: "/dashboard",
	},
	{
		routeName: "Points",
		icon: DatabaseIcon,
		route: "/dashboard/points",
	},
	{
		routeName: "Listing",
		icon: MegaphoneIcon,
		route: "/dashboard/listing",
	},
	{
		routeName: "Profile",
		icon: UserIcon,
		route: "/dashboard/profile",
	},
];

const Footer = () => {
    const pathname = usePathname();

	return (
		<footer className="flex items-center justify-between gap-4 px-3.5 pb-4 w-full md:pb-1 md:w-4/5 md:left-[10%] lg:left-[25%] lg:w-1/2 md:mx-auto fixed bottom-0 bg-brand-black/70 backdrop-blur text-brand-white z-50">
			{links.map((link) => (
				<Link
					className={`text-sm grid gap-1 transition-colors ease-in-out duration-300 font-medium border-t-2 pt-2 ${
						link.route === pathname ||
						link.route ===
							`/${pathname?.split("/")[1]}/${
								pathname?.split("/")[2]
							}`
							? "border-brand-lime text-brand-lime"
							: "hover:border-brand-lime hover:text-brand-lime border-transparent"
					}`}
					href={link.route}
					key={link.routeName}
				>
					{
						<link.icon
							className="mx-auto"
							size={20}
						/>
					}

					{link.routeName}
				</Link>
			))}
		</footer>
	);
};

export default Footer;
