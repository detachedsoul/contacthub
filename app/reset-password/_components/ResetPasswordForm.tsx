"use client";

import errorToast from "@/utils/error-toast";
import successToast from "@/utils/success-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { resetPassword } from "@/services/user-service";

const ResetPasswordForm = () => {
	const router = useRouter();

	const searchParams = useSearchParams();
	const token = searchParams?.get("token");

	const [isLoading, setIsLoading] = useState(false);

	const [passwordIsVisible, setPasswordIsVisible] = useState({
		newPassword: false,
		confirmPassword: false,
	});

	const [formValues, setFormValues] = useState({
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		if (!token) {
			errorToast("Invalid token. Please check the URL");

			setIsLoading(false);

			return;
		}

		const { password, confirmPassword } = formValues;

		if (!password || !confirmPassword) {
			errorToast("All fields are required.");

			setIsLoading(false);

			return;
		}

		if (password !== confirmPassword) {
			errorToast("Passwords do not match.");

			setIsLoading(false);

			return;
		}

		try {
			const result = await resetPassword({
				token,
				password: formValues.password,
			});

			if (typeof result === "string") {
				errorToast(result);

				setIsLoading(false);

				return;
			}

			successToast("Password reset successfully.");

			setFormValues({
				password: "",
				confirmPassword: "",
			});

			router.replace("/sign-in");
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
			<div className="grid gap-4 md:w-4/5 md:mx-auto">
				<label
					htmlFor="password"
					className="space-y-2"
				>
					<span className="text-left block">New Password</span>

					<div className="relative">
						<input
							className="input pr-12"
							type={
								passwordIsVisible.newPassword
									? "text"
									: "password"
							}
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
							onClick={() =>
								setPasswordIsVisible((prev) => {
									return {
										...prev,
										newPassword:
											!passwordIsVisible.newPassword,
									};
								})
							}
						>
							{passwordIsVisible.newPassword ? (
								<EyeOffIcon />
							) : (
								<EyeIcon />
							)}
						</button>
					</div>
				</label>

				<label
					htmlFor="confirmPassword"
					className="space-y-2"
				>
					<span className="text-left block">Confirm Password</span>

					<div className="relative">
						<input
							className="input pr-12"
							type={
								passwordIsVisible.confirmPassword
									? "text"
									: "password"
							}
							placeholder="Confirm Password"
							name="confirmPassword"
							id="confirmPassword"
							value={formValues.confirmPassword}
							onChange={handleChange}
						/>

						<button
							className="absolute right-4 top-3 text-brand-lime"
							type="button"
							aria-label="Toggle password visibility"
							onClick={() =>
								setPasswordIsVisible((prev) => {
									return {
										...prev,
										confirmPassword:
											!passwordIsVisible.confirmPassword,
									};
								})
							}
						>
							{passwordIsVisible.confirmPassword ? (
								<EyeOffIcon />
							) : (
								<EyeIcon />
							)}
						</button>
					</div>
				</label>
			</div>

			<button
				className="btn md:w-4/5 md:mx-auto"
				type="submit"
				disabled={
					!formValues.password ||
					!formValues.confirmPassword ||
					isLoading ||
					formValues.password !== formValues.confirmPassword
				}
			>
				{isLoading ? "Processing..." : "Reset Password"}
			</button>
		</form>
	);
};

export default ResetPasswordForm;
