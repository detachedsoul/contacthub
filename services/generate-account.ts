/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const generateAccount = async () => {
    try {
        const req = await fetch(
			"https://api.payvessel.com/api/external/request/customerReservedAccount/",
			{
				method: "POST",
				headers: {
					"api-key": process.env.API_KEY ?? "",
					"api-secret": process.env.API_SECRET ?? "",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: "ojimahwisdom01@gmail.com",
					name: "Wisdom Ojimah",
					phoneNumber: "08105008304",
					bankcode: ["120001"],
					account_type: "DYNAMIC",
					businessid: process.env.BUSINESS_ID,
					bvn: process.env.BVN,
					nin: process.env.NIN,
				}),
			},
		);

        if (!req.ok) {
            const error = await req?.json();

           throw new Error(error?.message);
		}

		const res = await req.json();

        return res;
    } catch (error: any) {
        throw new Error(String(error?.message));
    }
};

export default generateAccount;
