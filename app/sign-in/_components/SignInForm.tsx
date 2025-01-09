"use client";

import Link from "next/link";
import isFormFieldsComplete from "@/utils/isFormComplete";
import isEmailValid from "@/utils/isEmailValid";
import errorToast from "@/utils/error-toast";
import successToast from "@/utils/success-toast";
import { ChangeEvent, FormEvent, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { userLogin } from "@/services/user-service";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
	const router = useRouter();

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormValues((prev) => {
            return {
                ...prev,
                [name]: name === "email" ? value.toLowerCase() :  value
            }
        })
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const res = await userLogin({
				email: formValues.email,
				password: formValues.password,
			});

            if (typeof res === "string") {
				errorToast(res);

				return;
			}

            successToast("Login successful.");

            setIsLoading(false);

			const userDetails = {
				name: res.get("name"),
				email: res.get("email"),
				state: res.get("state"),
				gender: res.get("gender"),
			};

			localStorage.setItem("user-details", JSON.stringify(userDetails));

            router.replace("/dashboard");
        } catch (error) {
            errorToast(error as string)
        } finally {
            setIsLoading(false);
        }
    }

	return (
		<form
			className="space-y-8"
			onSubmit={handleSubmit}
        >
			<div className="grid gap-4 md:w-4/5 md:mx-auto">
				<label htmlFor="email">
					<input
						className="input"
						type="email"
						placeholder="Email Address"
						name="email"
						id="email"
						value={formValues.email}
						onChange={handleChange}
					/>
				</label>

				<div className="grid gap-1.5">
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
							className="absolute right-4 top-3 text-lime-500"
							type="button"
							aria-label="Toggle password visibility"
							onClick={() =>
								setPasswordIsVisible(!passwordIsVisible)
							}
						>
							{passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
						</button>
					</label>

					<Link
						className="text-lime-500 text-left underline-offset-4 decoration-wavy hover:underline inline-block mr-auto"
						href="/forgot-password"
					>
						Forgot Password?
					</Link>
				</div>
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
				{isLoading ? "Signing In..." : "Sign In"}
			</button>
		</form>
	);
};

export default SignUpForm;
