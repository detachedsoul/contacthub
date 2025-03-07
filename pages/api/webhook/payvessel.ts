/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";


const PARSE_APPLICATION_ID = "plbXUCZ8nfi2lwLxmNXKXNZSYRvWAAXWt0bs39Vz";
const PARSE_REST_API_KEY = "StSQx6j9aM1bemNJJzUBe4JmI1CpaAK5mOkhjsr8";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // const payvesselSignature = req.headers["http_payvessel_http_signature"] as string;
  const ipAddress:any = req.headers["x-forwarded-for"];

  const  whitelist = ["162.246.254.36", "3.255.23.38"]
  
  if ( !whitelist.includes(ipAddress)) {
    return res.status(405).json({ message: `Uknown Ip Address ${ipAddress} ${req.headers}` });
  }

  const payload: any = req.body;
  // console.log(payload);

  const { order, transaction, customer } = payload;

  const amount = parseFloat(order.amount);
  const settlementAmount = parseFloat(order.settlement_amount);
  const fee = parseFloat(order.fee);
  const reference = transaction.reference;
  // const desc = order.description;
  const email = customer.email;

  if (!order || !transaction) {
    return res.status(200).json({
      message: "Invalid payload data"
    });
  }

  // Fetch User by email
  const userQueryUrl = `${PARSE_HOST_URL}/classes/UserDetails?where={"email":"${email}"}`;
  const userResponse = await fetch(userQueryUrl, {
    method: "GET",
    headers: {
      "X-Parse-Application-Id": PARSE_APPLICATION_ID,
      "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
      "Content-Type": "application/json",
    },
  });

  const userData = await userResponse.json();

  if (!userData.results || userData.results.length === 0) {
    return res.status(400).json({
      message: "Invalid user"
    });
  }

  const user = userData.results[0]; // Assuming there's only one user with this email

  // Check if the transaction already exists
  const transactionQueryUrl = `${PARSE_HOST_URL}/classes/Transactions?where={"reference":"${reference}"}`;
  const transactionResponse = await fetch(transactionQueryUrl, {
    method: "GET",
    headers: {
      "X-Parse-Application-Id": PARSE_APPLICATION_ID,
      "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
      "Content-Type": "application/json",
    },
  });

  const transactionData = await transactionResponse.json();

  if (transactionData.results && transactionData.results.length > 0) {
    return res.status(400).json({
      message: "This transaction already exists"
    });
  }

  console.log(user);
  
 // Create a new transaction
 const newTransaction = {
  user_id: { __type: "Pointer", className: "UserDetails", objectId: user.objectId },
  desc: 'Wallet Funding',
  amount: amount.toString(),
  fee: fee.toString(),
  settlement_amount: settlementAmount.toString(),
  reference: reference,
  date: { __type: "Date", iso: new Date().toISOString() },
};

  const transactionUrl = `${PARSE_HOST_URL}classes/Transactions`;

  
  const transactionSaveResponse = await fetch(transactionUrl, {
    method: "POST",
    headers: {
      "X-Parse-Application-Id": PARSE_APPLICATION_ID,
      "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTransaction),
  });

 await transactionSaveResponse.json();

  if (transactionSaveResponse.ok) {
    // Update user points
    const currentPoints = user.points || 0;
    const updatedPoints = currentPoints + amount;

    console.log(currentPoints);
    console.log(updatedPoints);
    

    const updateUser = {
      points: updatedPoints,
    };
    

    const userUpdateUrl = `${PARSE_HOST_URL}/classes/UserDetails/${user.objectId}`;
    const userUpdateResponse = await fetch(userUpdateUrl, {
      method: "PUT",
      headers: {
        "X-Parse-Application-Id": PARSE_APPLICATION_ID,
        "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    });

    console.log(userUpdateResponse);
    

    if (userUpdateResponse.ok) {
      return res.status(200).json({
        message: "Success"
      });
    } else {
      return res.status(400).json({
        message: "Error updating user points"
      });
    }
  } else {
    return res.status(400).json({
      message: "Error occurred while saving the transaction"
    });
  }
};

export default handler;
