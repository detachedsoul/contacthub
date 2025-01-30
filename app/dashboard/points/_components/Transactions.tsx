"use client";

import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { fetchTransactions } from "@/services/user-service";

const formatDate = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	};

    const formatter = new Intl.DateTimeFormat("en-US", options);

	return formatter.format(date);
};

const Transactions = () => {
    const { authDetails } = useAuth();

    const { data, error, isLoading } = useFetch(
		["fetchListings", authDetails?.id ?? "", authDetails?.email ?? ""],
		() =>
			fetchTransactions({
				id: authDetails?.id ?? "",
				email: authDetails?.email ?? "",
			}),
		{
			refreshInterval: 50000,
		},
    );

    console.log(data)

    return (
		<>
			{Array.isArray(data) && data.length < 1 && (
				<div className="h-[150px] grid place-content-center">
					<p className="font-medium text-lg">
						You are yet to make a transaction.
					</p>
				</div>
			)}

			{isLoading && (
				<div className="h-[150px] w-full animate-pulse bg-gray-900 min-w-full"></div>
			)}

			{error && (
				<div className="h-[150px] grid place-content-center">
					<p className="font-medium text-lg text-rose-500">
						{String(error)}
					</p>
				</div>
			)}

			{Array.isArray(data) && data.length > 0 && (
				<div className="overflow-x-auto custom-scrollbar bg-gray-900">
					<table className="w-full border-collapse table-auto">
						<thead className="text-left whitespace-nowrap">
							<tr>
								<th className="px-4 py-4 font-medium border-b-[0.031rem] border-brand-lime">
									Amount
								</th>

								<th className="px-4 py-4 font-medium border-b-[0.031rem] border-brand-lime">
									Description
								</th>

								<th className="px-4 py-4 font-medium border-b-[0.031rem] border-brand-lime">
									Fee
								</th>

								<th className="px-4 py-4 font-medium border-b-[0.031rem] border-brand-lime">
									Settlement Amount
								</th>

								<th className="px-4 py-4 font-medium border-b-[0.031rem] border-brand-lime">
									Reference
								</th>

								<th className="px-4 py-4 font-medium border-b-[0.031rem] border-brand-lime">
									Date
								</th>
							</tr>
						</thead>

						<tbody>
                            {data?.map((item) => (
                                <tr key={item.get("reference")}>
                                    <td className="p-4 whitespace-nowrap font-normal border-b-[0.031rem] border-[#5d5d5d14] last:border-none last:border-transparent">
                                        {item.get("amount")}
                                    </td>

                                    <td className="p-4 whitespace-nowrap font-normal border-b-[0.031rem] border-[#5d5d5d14] last:border-none last:border-transparent">
                                        {item.get("fee")}
                                    </td>

                                    <td className="p-4 whitespace-nowrap font-normal border-b-[0.031rem] border-[#5d5d5d14] last:border-none last:border-transparent">
                                        {item.get("settlement_amount")}
                                    </td>

                                    <td className="p-4 whitespace-nowrap font-normal border-b-[0.031rem] border-[#5d5d5d14] last:border-none last:border-transparent">
                                        {item.get("desc")}
                                    </td>

                                    <td className="p-4 whitespace-nowrap font-normal border-b-[0.031rem] border-[#5d5d5d14] last:border-none last:border-transparent">
                                        {item.get("reference")}
                                    </td>

                                    <td className="p-4 whitespace-nowrap font-normal border-b-[0.031rem] border-[#5d5d5d14] last:border-none last:border-transparent">
                                        {formatDate(
                                            new Date(item.get("date")),
                                        )}
                                    </td>
                                </tr>
                            ))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};

export default Transactions;
