"use client";

import Modal from "@/components/Modal";
import useAuth from "@/hooks/useAuth";
import isEmailValid from "@/utils/isEmailValid";
import isFormFieldsComplete from "@/utils/isFormComplete";
import errorToast from "@/utils/error-toast";
import successToast from "@/utils/success-toast";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { UserRoundIcon } from "lucide-react";
import { updateAccountDetails } from "@/services/user-service";

const EditUserDetails = () => {
	const { authDetails, setAuthDetails } = useAuth();

	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
	});
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormValues((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	useEffect(() => {
		if (authDetails) {
			setFormValues({
				name: authDetails?.name,
				email: authDetails?.email,
			});
		}
	}, [authDetails]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const res = await updateAccountDetails({
				id: authDetails?.id ?? "",
				currentEmail: authDetails?.email ?? "",
				newEmail: formValues.email,
				newName: formValues.name,
			});

			if (typeof res === "string") {
				errorToast(res);

				return;
			}

			successToast("Name and email updated successfully.");

			setIsLoading(false);

			const userDetails = {
				id: res.id,
				name: res.get("name"),
				email: res.get("email"),
				state: res.get("state"),
				gender: res.get("gender"),
			};

			localStorage.setItem("user-details", JSON.stringify(userDetails));

            setAuthDetails(userDetails);
		} catch (error) {
			errorToast(error as string);
		} finally {
			setIsLoading(false);
		}
	};

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
				<form
					className="grid gap-8"
					onSubmit={handleSubmit}
				>
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
								value={formValues?.email ?? ""}
								name="email"
								id="email"
								onChange={handleChange}
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
								value={formValues?.name ?? ""}
								name="name"
								id="name"
								onChange={handleChange}
							/>
						</label>
					</div>

					<button
						className="btn ring-offset-brand-white"
						type="submit"
						disabled={
							!isFormFieldsComplete(formValues) ||
							isLoading ||
							!isEmailValid(formValues.email)
						}
					>
						{isLoading ? "Updating details..." : "Update Details"}
					</button>
				</form>
			</Modal>
		</>
	);
};

export default EditUserDetails;
