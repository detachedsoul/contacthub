import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import AuthImage from "@/assets/auth-image.svg";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "ContactHub | Forgot Password",
	description:
		"Enter your email and a link would be sent to reset your password.",
};

const SignUp = () => {
	return (
		<section className="space-y-8 text-center">
			<Image
				className="mx-auto animate-floatBounce"
				src={AuthImage}
				alt=""
			/>

			<div className="space-y-4">
				<h1 className="text-3xl font-semibold bg-gradient-to-tr from-red-500 to-green-500 bg-clip-text">
					Forgot Password
				</h1>

                <p className="w-4/5 mx-auto">
                    Enter your email and a link would be sent to reset your password.
				</p>
			</div>

			<ForgotPasswordForm />

			<p>
				Remembered your login details?{" "}
				<Link
					className="text-lime-500 underline-offset-4 decoration-wavy hover:underline font-semibold"
					href="/sign-in"
				>
					Sign in
				</Link>{" "}
				instead
			</p>
		</section>
	);
};

export default SignUp;
