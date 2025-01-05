import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/assets/hero-image.png";

const Index = () => {
	return (
        <main className="md:w-4/5 lg:w-1/2 md:mx-auto grid place-content-center min-h-svh px-4 py-8">
            <section className="text-center space-y-8">
                <Image
                    className="w-3/5 mx-auto object-center object-cover animate-floatBounce"
                    src={HeroImage}
                    alt="Get more views on WhatsApp"
                />

                <div className="space-y-3">
                    <h1 className="text-3xl font-semibold">
                        Need More <span className="text-lime-500">WhatsApp</span>{" "}
                        Contacts or Viewers? We Got You
                    </h1>

                    <p className="w-4/5 mx-auto">
                        Add new friends, rack up points, and get your profile listed
                        for others to add you back.
                    </p>
                </div>

                <Link
                    className="btn w-4/5 mx-auto"
                    href="/sign-up"
                >
                    Get Started
                </Link>

                <p>
                    Not a new user?{" "}
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

export default Index;
