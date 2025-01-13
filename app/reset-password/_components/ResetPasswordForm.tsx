"use client";

import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

const ResetPasswordForm = () => {
    const [passwordIsVisible, setPasswordIsVisible] = useState({
        newPassword: false,
        confirmPassword: false
    });

	return (
		<form className="space-y-8">
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
						/>

						<button
							className="absolute right-4 top-3 text-lime-500"
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
						/>

						<button
							className="absolute right-4 top-3 text-lime-500"
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
			>
				Reset Password
			</button>
		</form>
	);
};

export default ResetPasswordForm;
