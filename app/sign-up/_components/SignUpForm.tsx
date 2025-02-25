"use client";

import FormSelect from "@/components/FormSelect";
import statesOfNigeria from "@/utils/states";
import isFormFieldsComplete from "@/utils/isFormComplete";
import errorToast from "@/utils/error-toast";
import isEmailValid from "@/utils/isEmailValid";
import successToast from "@/utils/success-toast";
import useAuth from "@/hooks/useAuth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { createUser } from "@/services/user-service";
import { useRouter } from "next/navigation";

const genders = [
	{ name: "Male", value: "Male" },
	{ name: "Female", value: "Female" },
];

const SignUpForm = () => {
    const router = useRouter();
    const { setAuthDetails } = useAuth();

	const [passwordIsVisible, setPasswordIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [state, setState] = useState("");
	const [gender, setGender] = useState("");

	const [formValues, setFormValues] = useState({
		email: "",
		name: "",
		password: "",
		state: state,
		gender: gender,
	});

	useEffect(() => {
		setFormValues((prev) => {
			return {
				...prev,
				state: state,
				gender: gender,
			};
		});
	}, [state, gender]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormValues((prev) => {
			return {
				...prev,
				[name]: name === "email" ? value.toLowerCase() :  value,
			};
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsLoading(true);

		if (!isFormFieldsComplete) {
			errorToast("All fields are required.");
			setIsLoading(false);

			return;
		}

		if (!isEmailValid(formValues.email)) {
			errorToast("Invalid email address.");
			setIsLoading(false);

			return;
		}

		try {
			const res = await createUser(formValues);

			if (!res?.id) {
				errorToast(res);

				return;
			}

			successToast("Account created successfully.");

			setIsLoading(false);

			const userDetails = {
				id: res?.id,
				name: res?.attributes?.name,
				email: res?.attributes?.email,
				state: res?.attributes?.state,
				gender: res?.attributes?.gender,
				points: res?.attributes?.points,
			};

			localStorage.setItem("user-details", JSON.stringify(userDetails));

            setAuthDetails(userDetails);

			router.replace("/dashboard");
		} catch (error) {
			errorToast(error as string);

			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			className="space-y-8"
			onSubmit={handleSubmit}
		>
			<div className="grid gap-4 md:w-4/5 md:mx-auto md:grid-cols-2">
				<label htmlFor="email">
					<input
						className="input"
						placeholder="Email Address"
						name="email"
						id="email"
						value={formValues.email}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="name">
					<input
						className="input"
						type="text"
						placeholder="Enter your full name"
						name="name"
						id="name"
						value={formValues.name}
						onChange={handleChange}
					/>
				</label>

				<label
					htmlFor="password"
					className="relative"
				>
					<input
						className="input pr-12"
						type={passwordIsVisible ? "text" : "password"}
						placeholder="Password"
						name="password"
						id="password"
						value={formValues.password}
						onChange={handleChange}
					/>

					<button
						className="absolute right-4 top-3 text-brand-lime"
						type="button"
						aria-label="Toggle password visibility"
						onClick={() => setPasswordIsVisible(!passwordIsVisible)}
					>
						{passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
					</button>
				</label>

				<label htmlFor="state">
					<FormSelect
						data={statesOfNigeria}
						displayKeys={{ label: "name", value: "value" }}
						placeholder="Select State"
						name="state"
						onChange={setState}
					/>
				</label>

				<label
					className="md:col-span-2"
					htmlFor="gender"
				>
					<FormSelect
						data={genders}
						displayKeys={{ label: "name", value: "value" }}
						placeholder="Select Gender"
						name="gender"
						onChange={setGender}
					/>
				</label>
			</div>

			<button
				className="btn md:w-4/5 md:mx-auto"
				type="submit"
				disabled={
					!isFormFieldsComplete(formValues) ||
					isLoading ||
					!isEmailValid(formValues.email)
				}
			>
				{isLoading ? "Creating account..." : "Create Account"}
			</button>
		</form>
	);
};

export default SignUpForm;
