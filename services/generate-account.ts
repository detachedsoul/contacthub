/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const generateAccount = async (
	email: string,
	name: string,
	phoneNumber: string,
) => {
	try {
		const req = await fetch(
			"https://api.payvessel.ng/pms/api/external/request/customerReservedAccount/",
			{
				method: "POST",
				headers: {
					"api-key": process.env.NEXT_PUBLIC_API_KEY!,
					"api-secret": process.env.NEXT_PUBLIC_API_SECRET!,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					name: name,
					phoneNumber: phoneNumber,
					bankcode: ["120001"],
					account_type: "DYNAMIC",
					businessid: process.env.NEXT_PUBLIC_BUSINESS_ID!,
					bvn: "",
					nin: "",
				}),
			},
		);

		if (!req.ok) {
			const error = await req?.json();

			throw new Error(error.message);
		}

		const res = await req.json();

		return res;
	} catch (error: any) {
		return String(error);
	}
};

export default generateAccount;
