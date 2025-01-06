"use client";

import FormSelect from "@/components/FormSelect";
import statesOfNigeria from "@/utils/states";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

const genders = [
	{ name: "Male", value: "Male" },
	{ name: "Female", value: "Female" },
];

const listTypes = [
	{ name: "Add Ups / More Contact", value: "contacts" },
	{ name: "Group Join", value: "group" },
];

const states = [{ name: "All States", value: "all" }, ...statesOfNigeria];

const durationOptions = [
	{ name: "6 hours", value: "6 hours" },
	{ name: "12 hours", value: "12 hours" },
	{ name: "24 hours", value: "24 hours" },
	{ name: "48 hours", value: "48 hours" },
	{ name: "1 week", value: "1 week" },
	{ name: "1 month", value: "1 month" },
];

const AddListingForm = () => {
	const [state, setState] = useState("");
	const [duration, setDuration] = useState("");
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const [listType, setListType] = useState("contact");

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

	console.log(state, duration, listType);

	return (
		<form className="space-y-8">
			<div className="grid gap-4 items-start md:w-4/5 md:mx-auto md:grid-cols-2">
				<label
					className="space-y-2 md:col-span-2"
					htmlFor="profilePicture"
				>
					<span className="block text-center">Select Display Image</span>

					<div className="h-28 w-28 mx-auto bg-lime-500/100 rounded-full grid place-content-center cursor-pointer relative ">
						<UserIcon size={50} strokeWidth={1.5} />

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
					/>
				</label>

				{listType === "contacts" && (
					<label
						className="space-y-2"
						htmlFor="whatsAppNumber"
					>
						<span>WhatsApp Number</span>

						<input
							className="input"
							type="text"
							placeholder="WhatsApp Number"
							name="whatsAppNumber"
							id="whatsAppNumber"
						/>
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
						onChange={setState}
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
				type="submit"
			>
				List Profile
			</button>
		</form>
	);
};

export default AddListingForm;
