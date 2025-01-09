import isEmailValid from "@/utils/isEmailValid";
import Parse from "@/utils/parse-config";
import { hashPassword, verifyPassword } from "@/utils/hash-password";

interface IUserDetails {
	name: string;
	email: string;
	password: string;
	state: string;
	gender: string;
}

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
		const checkIfUserExists = new Parse.Query(user);

		const userCount = await checkIfUserExists
			.equalTo("email", userDetails.email)
			.count();

		if (!isEmailValid(userDetails.email)) {
			throw new Error("Invalid email address.");
		}

		if (userCount > 0) {
			throw new Error("User with this email already exists.");
		}

		const result = await user.save();

		return result;
	} catch (error) {
		return String(error);
	}
};

export const userLogin = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<Parse.Object | string> => {
	const UserDetails = Parse.Object.extend("UserDetails");
	const user = new UserDetails();
	const query = new Parse.Query(user);

	try {
		const userExists = await query.equalTo("email", email).first();

		if (!userExists) {
			throw new Error("Incorrect email and/or password.");
		}

		// Check if password matches the password from the database
		const storedPassword = userExists.get("password");

		// Compare provided password with the hashed password
		const isPasswordValid = await verifyPassword({
			password: password,
			userPassword: storedPassword,
		});

		if (!isPasswordValid) {
			throw new Error("Incorrect email and/or password.");
		}

		return userExists;
	} catch (error) {
		return String(error);
	}
};
