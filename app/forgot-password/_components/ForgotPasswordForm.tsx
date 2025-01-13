"use client";

import errorToast from "@/utils/error-toast";
import successToast from "@/utils/success-toast";
import isEmailValid from "@/utils/isEmailValid";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { storeResetToken } from "@/services/user-service";

const randomUUID = uuidv4();

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

		if (!email || !isEmailValid(email)) {
			errorToast("Invalid email address");

			return;
		}

        try {
            const storeToken = await storeResetToken({
				email: email,
				token: randomUUID,
            });

			if (typeof storeToken === "string") {
                errorToast(storeToken);

                return;
            }

            const sendEmail = await emailjs.send(
				"service_bmojs2k",
				"template_4r3rjzi",
				{
					to_email: email,
					token: randomUUID,
				},
				{
					publicKey: "vSlsN5Wrd5XcBw9NC",
				},
			);

			if (sendEmail.status !== 200) {
				errorToast(sendEmail.text);

				setIsLoading(false);

				return;
			}

            successToast("A link to reset your password has been sent to your email");

            setIsLoading(false);
		} catch (error) {
			errorToast(String(error));
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
			<div className="grid gap-8 md:w-4/5 md:mx-auto">
				<label htmlFor="email">
					<input
						className="input"
						type="email"
						placeholder="Email Address"
						name="email"
						id="email"
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
					/>
				</label>

				<button
					className="btn"
					type="submit"
					disabled={!isEmailValid(email) || isLoading}
				>
					{isLoading ? "Generating reset link..." : "Reset Password"}
				</button>
			</div>
		</form>
	);
};

export default ForgotPasswordForm;
