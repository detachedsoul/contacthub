import AuthImage from "@/assets/auth-image.svg";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./_components/SignInForm";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "ContactHub | Sign In",
	description:
		"Welcome Back, Star! Ready to get more friends? Sign right back in!",
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
					Sign In
				</h1>

				<p className="w-4/5 mx-auto">
					Welcome Back, Star! Ready to get more friends? Sign right
					back in!
				</p>
			</div>

			<SignUpForm />

			<p>
				Don’t have an account yet?{" "}
				<Link
					className="text-lime-500 underline-offset-4 decoration-wavy hover:underline font-semibold"
					href="/sign-up"
				>
					Sign Up!
				</Link>
			</p>
		</section>
	);
};

export default SignUp;
