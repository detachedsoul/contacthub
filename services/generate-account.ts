"use server";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */


const generateAccount = async (email:string,name:string,phoneNumber:string) => {
    try {
        // Send POST request using Axios
        const response = await axios.post(
            "https://api.payvessel.com/api/external/request/customerReservedAccount/",
            {
                email: email,
                name: name,
                phoneNumber: phoneNumber,
                bankcode: ["120001"],
                account_type: "DYNAMIC",
                businessid: process.env.BUSINESS_ID,
                bvn: "",
                nin: "",
            },
            {
                headers: {
                    "api-key": process.env.API_KEY ?? "",
                    "api-secret": process.env.API_SECRET ?? "",
                    "Content-Type": "application/json",
                },
            }
        );

       
        // Handle successful response
        return response.data; // Axios returns data directly in the response object
    } catch (error: any) {
        // Handle error response
        if (error.response) {

			console.log(error.response);
			
            // Axios error response structure
            const errorMessage = error.response.data?.message || "Unknown error";
            throw new Error(errorMessage);
        } else {
            // Generic error if no response
            throw new Error(error?.message || "Something went wrong");
        }
    }
};

export default generateAccount;
