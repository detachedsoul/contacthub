"use client";

import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const SignUpForm = () => {
	const [passwordIsVisible, setPasswordIsVisible] = useState(false);

	return (
		<form className="space-y-8">
			<div className="grid gap-4 md:w-4/5 md:mx-auto">
				<label htmlFor="email">
					<input
						className="input"
						type="email"
						placeholder="Email Address"
						name="email"
						id="email"
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
						className="text-lime-500 text-left underline-offset-4 decoration-wavy hover:underline"
						href="/forgot-password"
					>
						Forgot Password?
					</Link>
				</div>
			</div>

			<button
				className="btn md:w-4/5 md:mx-auto"
				type="submit"
			>
				Sign In
			</button>
		</form>
	);
};

export default SignUpForm;
