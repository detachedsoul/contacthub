"use client";

import FormSelect from "@/components/FormSelect";
import statesOfNigeria from "@/utils/states";
import Image from "next/image";
import errorToast from "@/utils/error-toast";
import successToast from "@/utils/success-toast";
import useAuth from "@/hooks/useAuth";
import { UserIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createListing } from "@/services/user-service";

const genders = [
	{ name: "All Genders", value: "All" },
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
	const { authDetails } = useAuth();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const [state, setState] = useState("");
	const [gender, setGender] = useState("");
	const [duration, setDuration] = useState("");
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const [formValues, setFormValues] = useState({
		displayName: "",
		whatsAppNumber: "",
		groupLink: "",
	});

	const [listType, setListType] = useState("contacts");

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

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;

		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

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
				whatsapp_number: formValues.whatsAppNumber || undefined,
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
			});

			router.push("/dashboard/listing");
		} catch (error) {
			errorToast(String(error));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			className="space-y-8"
			onSubmit={handleSubmit}
		>
			<div className="grid gap-4 items-start md:w-4/5 md:mx-auto md:grid-cols-2">
				<label
					className="space-y-2 md:col-span-2"
					htmlFor="profilePicture"
				>
					<span className="block text-center">
						Select Display Image
					</span>

					<div className="h-28 w-28 mx-auto bg-lime-500/100 rounded-full grid place-content-center cursor-pointer relative ">
						<UserIcon
							size={50}
							strokeWidth={1.5}
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
							value={formValues.whatsAppNumber}
							onChange={handleChange}
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
				type="submit"
				disabled={isLoading}
			>
				{isLoading ? "Listing account..." : "List Profile"}
			</button>
		</form>
	);
};

export default AddListingForm;
