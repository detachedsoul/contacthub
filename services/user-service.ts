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

const UserDetails = Parse.Object.extend("UserDetails");

export const createUser = async (userDetails: IUserDetails) => {
	const user = new UserDetails();

	user.set("name", userDetails.name);
	user.set("email", userDetails.email.toLowerCase());
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
	const user = new UserDetails();
	const query = new Parse.Query(user);

	try {
		const userExists = await query.equalTo("email", email.toLowerCase()).first();

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

export const updateAccountDetails = async ({
	id,
	currentEmail,
	newEmail,
	newName,
}: {
	id: string;
	currentEmail: string;
	newEmail: string;
	newName: string;
}) => {
	const userQuery = new Parse.Query(UserDetails);
	userQuery.equalTo("email", currentEmail);
	userQuery.equalTo("objectId", id);

	const emailQuery = new Parse.Query(UserDetails);

	try {
		const userExists = await userQuery.first();

		if (!userExists) {
			throw new Error("Invalid logged in user.");
		}

		if (!isEmailValid(newEmail)) {
			throw new Error("Invalid email address.");
		}

		emailQuery.equalTo("email", newEmail.toLowerCase());
		const existingUserWithNewEmail = await emailQuery.first();

		if (
			existingUserWithNewEmail &&
			existingUserWithNewEmail.id !== userExists.id
		) {
			throw new Error("A user with this email already exists.");
		}

		userExists.set("email", newEmail.toLowerCase());
		userExists.set("name", newName);

		const result = await userExists.save();

		return result;
	} catch (error) {
		return String(error);
	}
};

export const deleteUser = async ({
	id,
	email,
}: {
	id: string;
	email: string;
}) => {
    const userQuery = new Parse.Query(UserDetails);
	userQuery.equalTo("email", email);
	userQuery.equalTo("objectId", id);

	try {
		const userExists = await userQuery.first();

		if (!userExists) {
			throw new Error("Invalid logged in user.");
		}

		const result = await userQuery.get(id);

        result.destroy();

        return result;
	} catch (error) {
		return String(error);
	}
};

export const checkUserIsLoggedIn = async ({
	id,
	email,
}: {
	id: string;
	email: string;
}) => {
    const userQuery = new Parse.Query(UserDetails);

	userQuery.equalTo("email", email);
	userQuery.equalTo("objectId", id);

	try {
		const userExists = await userQuery.first();

		if (!userExists) {
			throw new Error("You session has expired. Please login to continue.");
		}

		return true;
	} catch (error) {
		return String(error);
	}
};
