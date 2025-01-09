import bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
	const hashedPassword = await bcrypt.hash(password, 10);

	return hashedPassword;
};

const verifyPassword = async ({
	password,
	userPassword,
}: {
	password: string;
	userPassword: string;
}) => {
	const isMatch = await bcrypt.compare(
		password,
		userPassword,
	);

	return isMatch;
};

export { hashPassword, verifyPassword };
