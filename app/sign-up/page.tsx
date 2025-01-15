import AuthImage from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./_components/SignUpForm";
import AuthCheck from "@/components/AuthCheck";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "ContactHub | Sign Up",
	description:
		"Create a new account and start getting more WhatsApp contacts. It’s that easy!",
};

const SignUp = () => {
    return (
		<AuthCheck>
			<main className="md:w-4/5 lg:w-1/2 md:mx-auto grid place-content-center min-h-svh px-4 py-8">
				<section className="space-y-8 text-center">
					<Image
						className="mx-auto animate-floatBounce w-1/2 md:w-1/3 h-auto"
						src={AuthImage}
						alt=""
                    />

					<div className="space-y-4">
						<h1 className="text-3xl font-semibold bg-gradient-to-tr from-red-500 to-green-500 bg-clip-text">
							Sign Up
						</h1>

						<p className="w-4/5 mx-auto">
							Create a new account and start getting more WhatsApp
							contacts. It’s that easy!
						</p>
					</div>

					<SignUpForm />

					<p className="md:w-3/4 md:mx-auto">
						Not a new user?{" "}
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
		</AuthCheck>
	);
};

export default SignUp;
