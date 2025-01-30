/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
// import crypto from "crypto";

// Define types for your incoming payload (this can be more detailed based on your actual payload structure)

// const secret = "PVSECRET-";
// const allowedIps = ["3.255.23.38", "162.246.254.36"];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const payvesselSignature = req.headers[
		"http_payvessel_http_signature"
	] as string;
	const ipAddress = req.socket.remoteAddress;

	console.log(ipAddress, payvesselSignature);

	// if (!payvesselSignature || !ipAddress || !allowedIps.includes(ipAddress)) {
	//   return res.status(400).json({ message: 'Permission denied, invalid hash or IP address.' });
	// }

	const payload: any = req.body;

	console.log(payload);

	// // Generate hash using HMAC with SHA-512
	// const hash = crypto
	//   .createHmac('sha512', secret)
	//   .update(JSON.stringify(payload))
	//   .digest('hex');

	// // Verify the signature
	// if (payvesselSignature !== hash) {
	//   return res.status(400).json({ message: 'Invalid signature' });
	// }

    const { order, transaction, customer } = payload;

	const amount = parseFloat(order.amount);
	const settlementAmount = parseFloat(order.settlement_amount);
	const fee = parseFloat(order.fee);
	const reference = transaction.reference;
    const desc = order.description;
    const email = customer.email;

    if (!order || !transaction) {
        return res.status(200).json({
			message: "Invalid payload data"
		});
    }

	// Respond with success
	return res.status(200).json({
		message: "Success",
        data: {
			amount: amount,
            settlement_amount: settlementAmount,
            fee: fee,
            reference: reference,
            desc: desc,
            email: email

		},
	});
};

export default handler;
