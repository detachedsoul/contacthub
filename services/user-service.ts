import Parse from "@/utils/parse-config";
import isEmailValid from "@/utils/isEmailValid";
import convertToDate from "@/utils/convert-to-date";
import { hashPassword, verifyPassword } from "@/utils/hash-password";
import { getPointsForDuration } from "@/app/dashboard/listing/add/_components/AddListingForm";

interface IUserDetails {
	name: string;
	email: string;
	password: string;
	state: string;
	gender: string;
}

const UserDetails = Parse.Object.extend("UserDetails");
const UserListing = Parse.Object.extend("Listings");
const PointsRecord = Parse.Object.extend("AddedContactsRecords");
const PasswordReset = Parse.Object.extend("PasswordReset");
const Transaction = Parse.Object.extend("Transactions");

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
		const userExists = await query
			.equalTo("email", email.toLowerCase())
			.first();

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
			throw new Error(
				"Your session has expired. Please login to continue.",
			);
		}

		return true;
	} catch (error) {
		return String(error);
	}
};

export const createListing = async (listingData: {
	list_type: string;
	display_name: string;
	duration: string;
	preferred_gender: string;
	preferred_location: string;
	image_url: string;
	user_id: string;
	whatsapp_number?: string;
	group_link?: string;
	email: string;
	desc: string;
}) => {
	const {
		list_type,
		display_name,
		duration,
		preferred_gender,
		preferred_location,
		image_url,
		user_id,
		whatsapp_number,
		group_link,
		email,
		desc,
	} = listingData;

	const requiredFields = [
		{
			"List type": list_type,
		},
		{
			"Display name": display_name,
		},
		{
			"Listing duration": duration,
		},
		{
			"Preferred gender": preferred_gender,
		},
		{
			"Preferred location": preferred_location,
		},
		{
			"Display image": image_url,
		},
		{
			Description: desc,
		},
		{
			"User ID": user_id,
		},
		{
			"User email": email,
		},
	];

	if (!whatsapp_number && !group_link) {
		throw new Error(
			"Either whatsapp_number or group_link must be provided.",
		);
	}

	const userDetailsQuery = new Parse.Query(UserDetails);

	try {
		const userDetails = await userDetailsQuery.get(user_id);

		const userEmail = userDetails.get("email");
        const userPoints = userDetails.get("points");
        const deduction = getPointsForDuration(duration);

		if (Number(userPoints) < deduction) {
			throw new Error(
				"You don't have sufficient points to list your account.",
			);
		}

		for (const fields of requiredFields) {
			const [key, value] = Object.entries(fields)[0];

			if (!value) {
				throw new Error(`${key} is required.`);
			}

			if (key === "Description") {
				if (value.length > 250) {
					throw new Error(
						`Description should not exceed 250 characters.`,
					);
				}
			}
		}

		if (userEmail !== email) {
			throw new Error(
				"Invalid user credentials. Please try logging in again.",
			);
		}

		const Listings = Parse.Object.extend("Listings");
		const newListing = new Listings();

		// Set the required fields
		newListing.set("list_type", list_type);
		newListing.set("display_name", display_name);
		newListing.set("end_date", convertToDate(duration));
		newListing.set("preferred_gender", preferred_gender);
		newListing.set("preferred_location", preferred_location);
		newListing.set("image_url", image_url);
		newListing.set("user_id", userDetails);
		newListing.set("desc", desc);
		newListing.set("start_date", new Date());

		if (whatsapp_number) {
			newListing.set("whatsapp_number", whatsapp_number);
		}

		if (group_link) {
			newListing.set("group_link", group_link);
		}

		await newListing.save();

        // Update the points of the user
        userDetails.set("points", userPoints - deduction);
        const result = await userDetails.save();

        await fetch("/api/sendNotification", { method: "POST" });

		return result;
	} catch (error) {
		return String(error);
	}
};

export const fetchUserListing = async ({
	id,
	email,
	active,
}: {
	id: string;
	email: string;
	active: boolean;
}) => {
	const userQuery = new Parse.Query(UserDetails);
	userQuery.equalTo("email", email);
	userQuery.equalTo("objectId", id);

	try {
		const user = await userQuery.first();
		if (!user) {
			throw new Error("Invalid logged-in user.");
		}

		const listingQuery = new Parse.Query(UserListing);
		listingQuery.equalTo("user_id", user);

		if (active) {
			listingQuery.greaterThanOrEqualTo("end_date", new Date());
		} else {
			listingQuery.lessThan("end_date", new Date());
		}

		const listings = await listingQuery.find();

		return listings;
	} catch (error) {
		return String(error);
	}
};

export const fetchListings = async ({
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
		const user = await userQuery.first();

		if (!user) {
			throw new Error("Invalid logged-in user.");
		}

		const listingQuery = new Parse.Query(UserListing);

		listingQuery.notEqualTo("user_id", user.id);
		listingQuery.greaterThanOrEqualTo("end_date", new Date());

        const userState = user.get("state");

		if (userState) {
			listingQuery.containedIn("preferred_location", [userState, "all"]);
		} else {
			listingQuery.equalTo("preferred_location", "all");
		}

		const results = await listingQuery.find();

		return results;
	} catch (error) {
		return String(error);
	}
};

export const addPointsToUser = async ({
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
		const user = await userQuery.get(id);

		if (!user) {
			throw new Error("Invalid logged-in user.");
		}

		const currentPoints = user.get("points") || 0;

		const updatedPoints = currentPoints + 5;

		user.set("points", updatedPoints);

		const result = await user.save();

		return result;
	} catch (error) {
		return String(error);
	}
};

export const isNumberInAddedContactsRecords = async ({
	number,
	id,
	email,
}: {
	number: string;
	id: string;
	email: string;
}) => {
	const userQuery = new Parse.Query(UserDetails);
	const contactQuery = new Parse.Query(PointsRecord);

	userQuery.equalTo("email", email);
	userQuery.equalTo("objectId", id);

	try {
		const userExists = await userQuery.first();
		if (!userExists) {
			throw new Error("Invalid logged-in user.");
		}

		contactQuery.equalTo("user_id", userExists);
		contactQuery.equalTo("whatsapp_number", number);

		const existingRecord = await contactQuery.first();

		if (existingRecord) {
			return true;
		}

		const newRecord = new PointsRecord();
		newRecord.set("whatsapp_number", number);
		newRecord.set("user_id", userExists);

		await newRecord.save();

		return false;
	} catch (error) {
		return String(error);
	}
};

export const storeResetToken = async ({
	token,
	email,
}: {
	token: string;
	email: string;
}) => {
	const userQuery = new Parse.Query(UserDetails);
	const resetQuery = new Parse.Query(PasswordReset);

	userQuery.equalTo("email", email);

	try {
		const user = await userQuery.first();

		if (!user) {
			throw new Error("Invalid user.");
		}

		resetQuery.equalTo("user_id", user);

		const existingTokenRecord = await resetQuery.first();

		if (existingTokenRecord) {
			existingTokenRecord.set("token", token);
			existingTokenRecord.set("expires_at", convertToDate("1 hours"));

			await existingTokenRecord.save();
		} else {
			const newResetToken = new PasswordReset();

			newResetToken.set("token", token);
			newResetToken.set("expires_at", convertToDate("1 hours"));
			newResetToken.set("user_id", user);

			await newResetToken.save();
		}

		return true;
	} catch (error) {
		return String(error);
	}
};

export const resetPassword = async ({
	token,
	password,
}: {
	token: string;
	password: string;
}) => {
	const resetQuery = new Parse.Query(PasswordReset);
	const userQuery = new Parse.Query(UserDetails);

	try {
		resetQuery.equalTo("token", token);
		const resetRecord = await resetQuery.first();

		if (!resetRecord) {
			throw new Error("Invalid or expired reset token.");
		}

		const expiresAt = resetRecord.get("expires_at");
		if (expiresAt && new Date() > expiresAt) {
			throw new Error("Reset token has expired.");
		}

		const userId = resetRecord.get("user_id").id;
		userQuery.equalTo("objectId", userId);

		const user = await userQuery.first();

		if (!user) {
			throw new Error("User not found.");
		}

		user.set("password", await hashPassword(password));
		await user.save();

		await resetRecord.destroy();

		return true;
	} catch (error) {
		return String(error);
	}
};

export const checkOrCreateTransaction = async ({
	user_id,
	email,
	response_email,
	desc,
	amount,
	fee,
	settlement_amount,
	reference,
	date,
}: {
	user_id: string;
	email: string;
	response_email: string;
	desc: string;
	amount: string;
	fee: string;
	settlement_amount: string;
	reference: string;
	date: Date;
}) => {
	if (!reference || !user_id || !email) {
		throw new Error("transaction_id, user_id, and email are required");
    }

    if (response_email !== email) {
        throw new Error("Invalid user");
    }

	try {
		const userQuery = new Parse.Query(UserDetails);
		userQuery.equalTo("objectId", user_id);
		userQuery.equalTo("email", email);

		const user = await userQuery.first();

		if (!user) {
			throw new Error("Invalid user");
		}

		const transactionQuery = new Parse.Query(Transaction);
		const userPointer = new UserDetails();
		userPointer.id = user_id;

		transactionQuery.equalTo("reference", reference);
		transactionQuery.equalTo("user_id", userPointer);

		const existingTransaction = await transactionQuery.first();

		if (existingTransaction) {
			throw new Error("This transaction already exists");
		}

		const newTransaction = new Transaction();
		newTransaction.set("user_id", userPointer);
		newTransaction.set("desc", desc);
		newTransaction.set("amount", amount);
		newTransaction.set("fee", fee);
		newTransaction.set("settlement_amount", settlement_amount);
		newTransaction.set("reference", reference);
		newTransaction.set("date", date);

		const res = await newTransaction.save();

        if (res) {
            const userID = await userQuery.get(user_id);

            const currentPoints = userID.get("points") || 0;

			const updatedPoints = Number(currentPoints) + Number(amount);

			userID.set("points", updatedPoints);

			const result = await userID.save();

			return result;
        }
	} catch (error) {
		return String(error);
	}
};

export const fetchTransactions = async ({
	id,
	email,
}: {
	id: string;
	email: string;
}) => {
	const userQuery = new Parse.Query(UserDetails);
	const transactionQuery = new Parse.Query(Transaction);

	userQuery.equalTo("email", email);
	userQuery.equalTo("objectId", id);

	try {
		const user = await userQuery.first();

		if (!user) {
			throw new Error("Invalid logged-in user.");
		}

		transactionQuery.equalTo("user_id", user);
		transactionQuery.descending('date');
		// transactionQuery.limit(100);
		// transactionQuery.skip(100);

		const transactions = await transactionQuery.find();

		return transactions;

	} catch (error) {
		return String(error);
	}
};
