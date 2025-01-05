"use client";

import FormSelect from "@/components/FormSelect";
import statesOfNigeria from "@/utils/states";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const genders = [
	{ name: "Male", value: "Male" },
	{ name: "Female", value: "Female" },
];

const SignUpForm = () => {
	const [passwordIsVisible, setPasswordIsVisible] = useState(false);

	const [state, setState] = useState("");

    console.log(state)

	return (
		<form className="space-y-8">
			<div className="grid gap-4 md:w-4/5 md:mx-auto md:grid-cols-2">
				<label htmlFor="email">
					<input
						className="input"
						type="email"
						placeholder="Email Address"
						name="email"
						id="email"
					/>
				</label>

				<label htmlFor="firstName">
					<input
						className="input"
						type="text"
						placeholder="First Name"
						name="firstName"
						id="firstName"
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
					/>

					<button
						className="absolute right-4 top-3 text-lime-500"
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

                <label className="md:col-span-2" htmlFor="gender">
					<FormSelect
						data={genders}
						displayKeys={{ label: "name", value: "value" }}
						placeholder="Select Gender"
						name="gender"
						onChange={setState}
					/>
				</label>
			</div>

			<button
				className="btn md:w-4/5 md:mx-auto"
				type="submit"
			>
				Create Account
			</button>
		</form>
	);
};

export default SignUpForm;
