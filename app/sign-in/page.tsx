import AuthImage from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./_components/SignInForm";
import AuthCheck from "@/components/AuthCheck";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "ContactHub | Sign In",
	description:
		"Welcome Back, Star! Ready to get more friends? Sign right back in!",
};

const SignUp = () => {
    return (
		<AuthCheck>
			<main className="sm:w-4/5 lg:w-1/2 sm:mx-auto grid place-content-center min-h-svh px-4 py-8">
				<section className="space-y-8 text-center">
					<Image
                        className="mx-auto animate-floatBounce w-1/2 sm:w-1/3 h-auto"
                        src={AuthImage}
                        alt=""
                    />

					<div className="space-y-4">
						<h1 className="text-3xl font-semibold bg-gradient-to-tr from-red-500 to-green-500 bg-clip-text">
							Sign In
						</h1>

						<p className="w-4/5 mx-auto">
							Welcome Back, Star! Ready to get more friends? Sign
							right back in!
						</p>
					</div>

					<SignUpForm />

					<p className="sm:w-3/4 sm:mx-auto">
						Don’t have an account yet?{" "}
						<Link
							className="text-brand-lime underline-offset-4 decoration-wavy hover:underline font-semibold"
							href="/sign-up"
						>
							Sign Up!
						</Link>
					</p>
				</section>
			</main>
		</AuthCheck>
	);
};

export default SignUp;
