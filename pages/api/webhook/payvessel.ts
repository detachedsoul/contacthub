import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

// Define types for your incoming payload (this can be more detailed based on your actual payload structure)

const secret = 'PVSECRET-';
const allowedIps = ['3.255.23.38', '162.246.254.36'];

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const payvesselSignature = req.headers['http_payvessel_http_signature'] as string;
  const ipAddress = req.socket.remoteAddress;

  // console.log(ipAddress);
  

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

  const { order, transaction,customer} = payload;
  const amount = parseFloat(order.amount);
  const settlementAmount = parseFloat(order.settlement_amount);
  const fee = parseFloat(order.fee);
  const reference = transaction.reference;
  const description = order.description;
  const userEmail = customer.email;

  // Here you should check if the reference exists in your payment transaction table
  const transactionExists = false; // This should be replaced with your actual check

  if (transactionExists) {
    // If the reference already exists, return a message
    return res.status(200).json({ message: 'Transaction already exists' });
  }

  // get customer withemail

  // if cusomer not exits return error


//  credit customer

// create ransaction record


// transaction table

// user

// desc

// amount

// fee

// settlementAmount

// reference

// Date


  // If everything is valid, fund the user's wallet or perform other actions
  // Example: update user wallet with the amount (you should have a function to handle this)
  console.log('Funding user wallet with amount:', amount);

  // Respond with success
  return res.status(200).json({ message: 'Success' });
};

export default handler;
