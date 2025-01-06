"use client";

import Modal from "@/components/Modal";
import { formatAmount } from "@/utils/format-money";
import { CircleDotIcon, DatabaseIcon } from "lucide-react";
import { useState } from "react";

const BuyPoints = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

	return (
		<>
			<div className="rounded-2xl bg-gray-900 p-4 space-y-8">
				<p className="flex items-center gap-2">
					<DatabaseIcon size={20} />
					ContactHub points
				</p>

				<div className="space-y-2">
					<h2 className="text-sm">Total Points</h2>

					<p className="text-lg">0 Points</p>
				</div>

				<button
					className="inline-flex items-center gap-2 rounded-full py-2 px-4 border border-gray-300 hover:bg-lime-500 hover:text-white hover:border-lime-500 transition-colors duration-300 ease-in-out hover:ring-1 hover:ring-lime-500/50 ring-offset-gray-900 ring-offset-2"
					type="button"
					onClick={() => setModalIsOpen(true)}
				>
					<CircleDotIcon size={20} />
					Buy Points
				</button>
			</div>

			<Modal
				isOpen={modalIsOpen}
				toggleIsOpen={setModalIsOpen}
			>
				<form className="grid gap-8">
					<h2 className="text-center text-lg font-medium">
						Buy ContactHub Points
					</h2>

					<div className="grid gap-2">
						<label
							className="space-y-2"
							htmlFor="points"
						>
							<span className="text-sm">Number of Points</span>

							<input
								className="input ring-offset-brand-white border-gray-300"
								type="text"
								placeholder="Enter number of points"
								name="points"
								id="points"
							/>
						</label>

                        <p className="text-sm">
                            You would pay <span className="font-medium text-lime-500">{formatAmount({amount: 5000})}</span> for 2 points
                        </p>
					</div>

					<button
						className="btn ring-offset-brand-white"
						type="button"
					>
						Buy Points
					</button>
				</form>
			</Modal>
		</>
	);
};

export default BuyPoints;
