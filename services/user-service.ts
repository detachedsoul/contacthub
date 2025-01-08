import isEmailValid from "@/utils/isEmailValid";
import Parse from "@/utils/parse-config";
import { hashPassword } from "@/utils/hash-password";

interface IUserDetails {
	name: string;
	email: string;
	password: string;
	state: string;
	gender: string;
}

export const getUserDetails = async () => {
	const UserDetails = Parse.Object.extend("UserDetails");
	const query = new Parse.Query(UserDetails);

	try {
		const results = await query.find();

		return results;
	} catch (error) {
		console.log(error);
	}
};

export const createUser = async (userDetails: IUserDetails) => {
	const UserDetails = Parse.Object.extend("UserDetails");
	const user = new UserDetails();

	user.set("name", userDetails.name);
	user.set("email", userDetails.email);
	user.set("password", await hashPassword(userDetails.password));
	user.set("state", userDetails.state);
	user.set("gender", userDetails.gender);

	try {
        // Check if the email already exists
        const UserDetails = Parse.Object.extend("UserDetails");
	    const checkIfUserExists = new Parse.Query(UserDetails);

        const userCount = await checkIfUserExists.equalTo("email", userDetails.email).count();

        if (!isEmailValid(userDetails.email)) {
            throw new Error("Invalid email address.");
        }

        if (userCount > 0) {
            throw new Error("User with this email already exists.");
        }

		const result = await user.save();

		return result;
	} catch (error) {
        return error;
	}
};
