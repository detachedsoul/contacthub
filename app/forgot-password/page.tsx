import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import AuthImage from "@/assets/logo.png";
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
		<main className="sm:w-4/5 lg:w-1/2 sm:mx-auto grid place-content-center min-h-svh px-4 py-8">
			<section className="space-y-8 text-center">
				<Image
					className="mx-auto animate-floatBounce w-1/2 sm:w-1/3 h-auto"
					src={AuthImage}
					alt=""
				/>

				<div className="space-y-4">
					<h1 className="text-3xl font-semibold bg-gradient-to-tr from-red-500 to-green-500 bg-clip-text">
						Forgot Password
					</h1>

					<p className="w-4/5 mx-auto">
						Enter your email and a link would be sent to reset your
						password.
					</p>
				</div>

				<ForgotPasswordForm />

				<p className="sm:w-3/4 sm:mx-auto">
					Remembered your login details?{" "}
					<Link
						className="text-brand-lime underline-offset-4 decoration-wavy hover:underline font-semibold"
						href="/sign-in"
					>
						Sign in
					</Link>{" "}
					instead
				</p>
			</section>
		</main>
	);
};

export default SignUp;
