/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FormSelect from "@/components/FormSelect";
import statesOfNigeria from "@/utils/states";
import Image from "next/image";
import errorToast from "@/utils/error-toast";
import successToast from "@/utils/success-toast";
import useAuth from "@/hooks/useAuth";
import { ImageIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createListing } from "@/services/user-service";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Modal from "@/components/Modal";

// export const durationPoints: Record<string, number> = {
// 	"6 hours": 1000,
// 	"12 hours": 2000,
// 	"24 hours": 4000,
// 	"48 hours": 8000,
// 	"1 week": 30000,
// 	"1 month": 100000,
// };

export const durationPoints: Record<string, number> = {
	// "6 hours": 1000,
	// "12 hours": 2000,
	// "24 hours": 4000,
	// "48 hours": 8000,
	"1 week": 1500,
	"1 month": 6000,
};

export const getPointsForDuration = (duration: string): number => {
	return durationPoints[duration] ?? 0;
};

const genders = [
	{ name: "All Genders", value: "All" },
	{ name: "Male", value: "Male" },
	{ name: "Female", value: "Female" },
];

const listTypes = [
	{ name: "Add Ups / More Contact", value: "contacts" },
	// { name: "Group Join", value: "group" },
];

const states = [{ name: "All States", value: "all" }, ...statesOfNigeria];

const durationOptions = [
	// { name: "6 hours", value: "6 hours" },
	// { name: "12 hours", value: "12 hours" },
	// { name: "24 hours", value: "24 hours" },
	// { name: "48 hours", value: "48 hours" },
	// { name: "1 week", value: "1 week" },
	// { name: "1 month", value: "1 month" },

	{ name: "1 week", value: "1 week" },
	{ name: "1 month", value: "1 month" },
];

const AddListingForm = () => {
	const { authDetails, setAuthDetails } = useAuth();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const [state, setState] = useState("");
	const [gender, setGender] = useState("");
	const [duration, setDuration] = useState("");
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const [formValues, setFormValues] = useState({
		displayName: "",
		whatsAppNumber: "",
		groupLink: "",
		desc: "",
	});

	const [listType, setListType] = useState("contacts");

	const [phone, setPhone] = useState<any>(null);

	const showUploadedImage = (fileInputSelector: HTMLInputElement) => {
		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			const target = e.target as FileReader;
			setImageUrl(target.result as string);
		};

		if (fileInputSelector.files && fileInputSelector.files[0]) {
			reader.readAsDataURL(fileInputSelector.files[0]);
		}
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fileInputSelector = e.target as HTMLInputElement;
		showUploadedImage(fileInputSelector);
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;

		if (name === "whatsAppNumber" && isNaN(Number(value))) return;

		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

    const checkFormFields = () => {
		const requiredFields = [
			{
				"List type": listType,
			},
			{
				"Display name": formValues.displayName,
			},
			{
				"Listing duration": duration,
			},
			{
				"Preferred gender": gender,
			},
			{
				"Preferred location": state,
			},
			{
				"Display image": imageUrl,
			},
			{
				"Description": formValues.desc,
			},
			{
				"User ID": authDetails?.id,
			},
			{
				"User email": authDetails?.email,
            },
            {
				"WhatsApp Number": phone,
			},
        ];

        for (const fields of requiredFields) {
			const [key, value] = Object.entries(fields)[0];

			if (!value) {
				errorToast(`${key} is required.`);

                return;
			}

			if (key === "Description") {
				if (value.length > 250) {
					errorToast(`Description should not exceed 250 characters.`);

                    return;
				}
			}
		}

        setIsOpen(true);
    };

	const handleSubmit = async () => {
		if (!phone) {
			return;
		}

		setIsLoading(true);

		try {
			const res = await createListing({
				list_type: listType,
				preferred_location: state,
				preferred_gender: gender,
				duration: duration,
				image_url: imageUrl ?? "",
				user_id: authDetails?.id ?? "",
				email: authDetails?.email ?? "",
				display_name: formValues.displayName,
				desc: formValues.desc,
				whatsapp_number: phone,
				group_link: formValues.groupLink || undefined,
			});

			if (typeof res === "string") {
				errorToast(res);

				return;
			}

			successToast("Listing created successfully");

			setFormValues({
				displayName: "",
				whatsAppNumber: "",
				groupLink: "",
				desc: "",
			});

            const userDetails = {
				id: res.id,
				name: res.get("name"),
				email: res.get("email"),
				state: res.get("state"),
				gender: res.get("gender"),
				points: res.get("points"),
			};

            localStorage.setItem("user-details", JSON.stringify(userDetails));

            setAuthDetails(userDetails);

			router.push("/dashboard/listing");
		} catch (error) {
			errorToast(String(error));
		} finally {
			setIsLoading(false);
		}
    };

	return (
		<>
			<form className="grid gap-8">
				<div className="grid gap-4 items-start md:w-4/5 md:mx-auto md:grid-cols-2">
					<label
						className="space-y-2 mb-4 md:col-span-2"
						htmlFor="profilePicture"
					>
						<span className="block text-center font-medium">
							Upload Display Image
						</span>

						<div className="h-28 w-28 mx-auto bg-brand-lime/100 rounded-full grid place-content-center cursor-pointer relative ">
							<ImageIcon
								size={50}
								strokeWidth={1.5}
								className="text-black"
							/>

							<span className="sr-only">
								Upload a new profile picture
							</span>

							<input
								type="file"
								className="h-full cursor-pointer opacity-0 absolute inset-0 w-full rounded-xl z-50"
								id="profilePicture"
								name="profilePicture"
								onChange={handleImageChange}
							/>

							{imageUrl && (
								<Image
									className="absolute inset-0 w-full h-full object-cover object-center rounded-full cursor-pointer aspect-square"
									src={imageUrl ?? ""}
									fill
									alt=""
								/>
							)}
						</div>
					</label>

					<label
						className="space-y-2"
						htmlFor="listType"
					>
						<span>Listing Type</span>

						<FormSelect
							data={listTypes}
							displayKeys={{ label: "name", value: "value" }}
							placeholder="Listing Type"
							name="listType"
							onChange={setListType}
							defaultValue="contacts"
						/>
					</label>

					<label
						className="space-y-2"
						htmlFor="displayName"
					>
						<span>Display Name</span>

						<input
							className="input"
							type="displayName"
							placeholder="Display name"
							name="displayName"
							id="displayName"
							value={formValues.displayName}
							onChange={handleChange}
						/>
					</label>

					<label
						className="space-y-2 md:col-span-2"
						htmlFor="desc"
					>
						<span>Short Description</span>

						<textarea
							className="input"
							placeholder="Fashion store, unisex wears, etc..."
							name="desc"
							id="desc"
							value={formValues.desc}
							onChange={handleChange}
							maxLength={250}
							rows={3}
						></textarea>
					</label>

					{listType === "contacts" && (
						<label
							className="space-y-2"
							htmlFor="whatsAppNumber"
						>
							<span>WhatsApp Number</span>

							<div className="flex input p-0 focus:ring-0 items-center">
								<PhoneInput
									placeholder="Enter phone number"
									value={phone}
									international
									// style={}
									defaultCountry="NG"
									className="input border-transparent rounded-none focus:ring-0 bg-transparent pl-1 focus:outline-none focus:ring-transparent focus:ring-offset-0"
									onChange={setPhone}
								/>
							</div>
						</label>
					)}

					{listType !== "contacts" && (
						<label
							className="space-y-2"
							htmlFor="groupLink"
						>
							<span>Group Link</span>

							<input
								className="input"
								type="text"
								placeholder="Group link"
								name="groupLink"
								id="groupLink"
								value={formValues.groupLink}
								onChange={handleChange}
							/>
						</label>
					)}

					<label
						className="space-y-2"
						htmlFor="duration"
					>
						<span>Listing Duration</span>

						<FormSelect
							data={durationOptions}
							displayKeys={{ label: "name", value: "value" }}
							placeholder="Duration"
							name="duration"
							onChange={setDuration}
						/>
					</label>

					<label
						className="space-y-2"
						htmlFor="gender"
					>
						<span>Which gender do you want?</span>

						<FormSelect
							data={genders}
							displayKeys={{ label: "name", value: "value" }}
							placeholder="Select Gender"
							name="gender"
							onChange={setGender}
						/>
					</label>

					<label
						className="space-y-2"
						htmlFor="state"
					>
						<span>Where do you want contacts from?</span>

						<FormSelect
							data={states}
							displayKeys={{ label: "name", value: "value" }}
							placeholder="Select State"
							name="state"
							onChange={setState}
						/>
					</label>
				</div>

				<button
					className="btn md:w-4/5 md:mx-auto"
					type="button"
					onClick={() => checkFormFields()}
				>
					Continue
				</button>
			</form>

			<Modal
				isOpen={isOpen}
				toggleIsOpen={setIsOpen}
			>
				<div className="grid gap-4">
					<h2 className="font-medium text-center text-xl">
						Confirm Listing
					</h2>

					<div className="grid gap-6">
						<p>
							Your profile would be listed on our explore page for{" "}
							<span className="bg-brand-lime font-bold px-1.5">
								{duration}
							</span>
							. This would cost you{" "}
							<span className="bg-brand-lime font-bold px-1.5">
								{getPointsForDuration("1 month")}
							</span>{" "}
							points.
						</p>

						{authDetails &&
							authDetails?.points <
								getPointsForDuration(duration) && (
								<button
									className="btn block py-2.5 ring-offset-brand-white disabled:bg-lime-500"
									type="button"
									onClick={() =>
										router.push("/dashboard/points")
									}
								>
									Not enough points. Click to buy.
								</button>
							)}

						{authDetails &&
							authDetails?.points >=
								getPointsForDuration(duration) && (
								<button
									className="btn block py-2.5 ring-offset-brand-white disabled:bg-lime-500"
									type="button"
									disabled={isLoading}
									onClick={() => handleSubmit()}
								>
									{isLoading
										? "Listing account..."
										: "List Profile"}
								</button>
							)}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default AddListingForm;
