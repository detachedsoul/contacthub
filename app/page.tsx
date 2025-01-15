import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.jpeg";
import AuthCheck from "@/components/AuthCheck";

const Index = () => {
    return (
		<AuthCheck>
			<main className="md:w-4/5 lg:w-1/2 md:mx-auto relative flex flex-col place-content-end min-h-svh px-4 py-8 bg-index-bg bg-cover bg-center">
				<Image
					className="w-32 h-auto absolute top-8 right-4"
					src={Logo}
					alt="ContactHub"
				/>

				<section className="space-y-8">
					<div className="space-y-3">
						<h1 className="text-2xl md:text-3xl font-semibold">
							Boost your{" "}
							<span className="text-lime-500">WhatsApp</span>{" "}
							contacts!
						</h1>

						<p>Grow your WhatsApp contacts fast and meet new people!</p>
					</div>

					<div className="grid gap-4">
						<Link
							className="btn w-auto inline-block ring-offset-transparent text-center"
							href="/sign-up"
						>
							Get Started
						</Link>

						<Link
							className="btn bg-transparent hover:bg-lime-700 hover:border-transparent border border-lime-500 w-auto inline-block ring-offset-transparent text-center"
							href="/sign-in"
						>
							Sign In
						</Link>
					</div>
				</section>
			</main>
		</AuthCheck>
	);
};

export default Index;
