/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Modal from "@/components/Modal";
import useAuth from "@/hooks/useAuth";
import generateAccount from "@/services/generate-account";
import errorToast from "@/utils/error-toast";
import cookieManager from "@/utils/cookie-manager";
import successToast from "@/utils/success-toast";
import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";
import { formatAmount } from "@/utils/format-money";
import { CircleDotIcon, DatabaseIcon } from "lucide-react";
import { payload } from "@/utils/dummy-payload";
import { checkOrCreateTransaction } from "@/services/user-service";

const BuyPoints = () => {
	const { authDetails, setAuthDetails } = useAuth();

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [points, setPoints] = useState("");
    const [cookieValues, setCookieValues] = useState<null | any>(null);
    const [timeLeft, setTimeLeft] = useState<string>("");

	const [isSummaryShown, setIsSummaryShown] = useState(false);

    const { data } = useFetch(
		["confirmTransaction", authDetails, payload],
		async () => {
            try {
				const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						...payload,
						user_id: authDetails?.id ?? "",
					}),
				});

				if (!req.ok) {
					const error = await req?.json();

					return error?.message;
				}

				const res = await req.json();

				return res;
			} catch (error: any) {
				throw new Error(String(error?.message));
			}
		},
		{
			refreshInterval: 50000,
		},
	);

    const {
		data: transaction
	} = useFetch(
		["confirmTransaction", authDetails, data],
		() =>
			checkOrCreateTransaction({
				user_id: authDetails?.id ?? "",
				desc: data?.data?.desc,
				amount: String(data?.data?.amount),
				response_email: String(data?.data?.email),
				fee: String(data?.data?.fee),
				settlement_amount: String(data?.data?.settlement_amount),
                reference: data?.data?.reference,
                email: authDetails?.email ?? "",
				date: new Date(),
			}),
		{
			refreshInterval: 50000,
		},
	);

    if (transaction && typeof transaction !== "string") {
        const userDetails = {
            id: transaction.id,
            name: transaction.get("name"),
            email: transaction.get("email"),
            state: transaction.get("state"),
            gender: transaction.get("gender"),
            points: transaction.get("points"),
        };

        localStorage.setItem("user-details", JSON.stringify(userDetails));

        setAuthDetails(userDetails);
    }

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsSubmitting(true);

		const cookie = cookieManager.get("accountDetails");

		if (cookie) {
            if (new Date(JSON.parse(cookie).expire_date) > new Date()) {
                setCookieValues(JSON.parse(cookie));

				setIsSubmitting(false);
				setIsSummaryShown(true);

				return;
            } else {
                cookieManager.delete("accountDetails");
            }
		}

		try {
			const res = await generateAccount();

			if (res?.status === true) {
				cookieManager.set(
					"accountDetails",
					JSON.stringify(res?.banks) ?? "",
					{
						hours: 1,
					},
				);

				setCookieValues(res?.banks);

                setIsSummaryShown(true);

				successToast("Account generated successfully");
            } else {
                errorToast(String(res));
            }

			setIsSubmitting(false);
		} catch (error) {
			errorToast(String(error));

			setIsSubmitting(false);
		} finally {
			setIsSubmitting(false);
		}
    };

	useEffect(() => {
        if (cookieValues) {
            const target = new Date(cookieValues?.expire_date ?? "").getTime();

			if (isNaN(target)) {
				console.error("Invalid date provided");
				return;
			}

			const interval = setInterval(() => {
				const now = new Date().getTime();
				const remainingTime = target - now;

				if (remainingTime <= 0) {
					clearInterval(interval);
					return;
				}

				const totalSeconds = Math.floor(remainingTime / 1000);
				const hours = Math.floor(totalSeconds / 3600);
				const minutes = Math.floor((totalSeconds % 3600) / 60);
				const seconds = totalSeconds % 60;

				if (hours < 1) {
					setTimeLeft(`${minutes}m ${seconds}s`);
				} else {
					setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
				}
			}, 1000);

			return () => clearInterval(interval);
        }
	}, [cookieValues, timeLeft]);

	return (
		<>
			<div className="rounded-2xl bg-gray-900 p-4 space-y-8">
				<p className="flex items-center gap-2">
					<DatabaseIcon size={20} />
					ContactHub points
				</p>

				<div className="flex items-center gap-4 justify-between">
					<div className="space-y-2">
						<h2 className="text-sm">Total Points</h2>

						<p className="text-lg">
							{authDetails?.points ?? 0} Points
						</p>
					</div>

					<button
						className="inline-flex items-center gap-2 rounded-full py-2 px-4 border border-gray-300 hover:bg-brand-lime hover:text-white hover:border-brand-lime transition-colors duration-300 ease-in-out hover:ring-1 hover:ring-brand-lime/50 ring-offset-gray-900 ring-offset-2"
						type="button"
						onClick={() => setModalIsOpen(true)}
					>
						<CircleDotIcon size={20} />
						Buy Points
					</button>
				</div>
			</div>

			<Modal
				isOpen={modalIsOpen}
				toggleIsOpen={setModalIsOpen}
			>
				{!isSummaryShown && (
					<form
						className="grid gap-8"
						onSubmit={handleSubmit}
					>
						<div>
							<h2 className="text-center text-lg font-medium">
								Buy ContactHub Points
							</h2>

							<p className="text-sm text-center">
								Please note that you can purchase a minimum of
								500 points (1 point = 1 ₦)
							</p>
						</div>

						<div className="grid gap-2">
							<label
								className="space-y-2"
								htmlFor="points"
							>
								<span className="text-sm">
									Number of Points
								</span>

								<input
									className="input ring-offset-brand-white border-gray-300"
									type="text"
									placeholder="Enter number of points"
									name="points"
									id="points"
									value={points}
									onChange={(e) => {
										const { value } = e.target;

										if (
											isNaN(Number(value)) ||
											(Number(value) < 1 && value !== "")
										)
											return;

										setPoints(value);
									}}
								/>
							</label>

							<p className="text-sm">
								You would pay{" "}
								<span className="font-medium text-red-800">
									{formatAmount({
										amount: Number(points) * 1,
									})}
								</span>{" "}
								for {Number(points) ?? 0} points
							</p>
						</div>

						<button
							className={`btn ring-offset-brand-white disabled:bg-lime-500 ${
								!isSubmitting && Number(points) < 500
									? "disabled:animate-none disabled:bg-lime-500/60"
									: ""
							}`}
							type="submit"
							disabled={isSubmitting || Number(points) < 500}
						>
							{isSubmitting ? "Processing..." : "Buy Points"}
						</button>
					</form>
				)}

				{isSummaryShown && (
					<div className="grid gap-4">
						<p>
							Make a transfer of{" "}
							<span className="font-semibold text-red-800">
								{formatAmount({ amount: Number(points) })}
							</span>{" "}
							to the bank with the details below.{" "}
							<span className="font-semibold">
								Please note that this account is only valid for
								1 hour, and would expire in{" "}
								<span className="text-red-800">{timeLeft}</span>
							</span>
						</p>

						<div className="grid gap-2">
							<p>
								Bank:{" "}
								<span className="font-semibold">
									{cookieValues?.bankName}
								</span>
							</p>

							<p>
								Account Name:{" "}
								<span className="font-semibold">
									{cookieValues?.accountName}
								</span>
							</p>

							<p>
								Account Number:{" "}
								<span className="font-semibold">
									{cookieValues?.accountNumber}
								</span>
							</p>
						</div>

						<div className="grid gap-2  mt-4">
							<button
								className="btn ring-offset-brand-white disabled:bg-lime-500"
								type="button"
							>
								Continue
							</button>

							<button
								className="btn ring-offset-brand-white bg-transparent border hover:border border-brand-lime"
								type="button"
								onClick={() => setIsSummaryShown(false)}
							>
								Edit amount
							</button>
						</div>
					</div>
				)}
			</Modal>
		</>
	);
};

export default BuyPoints;
