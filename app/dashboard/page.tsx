"use client";

import Contacts from "./_components/Contacts";
import JoinGroup from "./_components/JoinGroup";
import { useState } from "react";

const options = ["Add Contacts", "Join Group"];

const Dashboard = () => {
	const [currentSelection, setCurrentSelection] = useState("Add Contacts");

	return (
		<section className="space-y-8">
			<div className="sticky top-6 md:top-[3.55rem] pb-4 z-[1024] bg-brand-black/70 backdrop-blur -mb-4">
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

			{currentSelection === "Add Contacts" && <Contacts />}
			{currentSelection === "Join Group" && <JoinGroup />}
		</section>
	);
};

export default Dashboard;
