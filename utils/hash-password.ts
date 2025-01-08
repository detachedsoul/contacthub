import bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
	const hashedPassword = await bcrypt.hash(password, 10);

	return hashedPassword;
};

const verifyPassword = async (password: string) => {
    const isMatch = await bcrypt.compare(password, await hashPassword(password));

	return isMatch;
};

export { hashPassword, verifyPassword };
