"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import { UserRoundIcon } from "lucide-react";

const EditUserDetails = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

	return (
		<>
			<button
				className="flex items-center gap-4 group transition-all duration-300 ease-in-out hover:gap-6"
				type="button"
				onClick={() => setModalIsOpen(true)}
			>
				<div className="rounded-full bg-gray-800 grid place-content-center p-4 transition-all duration-300 ease-in-out group-hover:ml-4 group-hover:bg-lime-500">
					<UserRoundIcon />
				</div>

				<div className="text-left">
					<h2 className="text-lime-500 font-medium">My Profile</h2>

					<p className="text-sm group-hover:pl-2 transition-all duration-300 ease-in-out">
						Make changes to your account
					</p>
				</div>
			</button>

			<Modal
				isOpen={modalIsOpen}
				toggleIsOpen={setModalIsOpen}
			>
				<form className="grid gap-8">
					<h2 className="text-center text-lg font-medium">
						Update Your Account Details
					</h2>

					<div className="grid gap-4">
						<label
							className="space-y-2"
							htmlFor="email"
						>
							<span className="text-sm">Email Address</span>

							<input
								className="input ring-offset-brand-white border-gray-300"
								type="email"
								placeholder="Email Address"
								name="email"
								id="email"
							/>
						</label>

						<label
							className="space-y-2"
							htmlFor="name"
						>
							<span className="text-sm">Name</span>

							<input
								className="input ring-offset-brand-white border-gray-300"
								type="text"
								placeholder="Enter Name"
								name="name"
								id="name"
							/>
						</label>
					</div>

					<button
						className="btn ring-offset-brand-white"
						type="button"
					>
						Update Details
					</button>
				</form>
			</Modal>
		</>
	);
};

export default EditUserDetails;
