import ResetPasswordForm from "./_components/ResetPasswordForm";
import AuthImage from "@/assets/auth-image.svg";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "ContactHub | Reset Password",
	description:
		"Create a new password for your account.",
};

const SignUp = () => {
	return (
        <main className="md:w-4/5 lg:w-1/2 md:mx-auto grid place-content-center min-h-svh px-4 py-8">
            <section className="space-y-8 text-center">
                <Image
                    className="mx-auto animate-floatBounce"
                    src={AuthImage}
                    alt=""
                />

                <div className="space-y-4">
                    <h1 className="text-3xl font-semibold bg-gradient-to-tr from-red-500 to-green-500 bg-clip-text">
                        Reset Password
                    </h1>

                    <p className="w-4/5 mx-auto">
                        Create a new password.
                    </p>
                </div>

                <ResetPasswordForm />

                <p className="md:w-3/4 md:mx-auto">
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
		</main>
	);
};

export default SignUp;
