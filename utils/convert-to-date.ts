const convertToDate = (value) => {
	const now = new Date();

	if (value.includes("hours")) {
		const hours = parseInt(value, 10);

		return new Date(now.getTime() + hours * 60 * 60 * 1000);
	}

	if (value.includes("week")) {
		const weeks = parseInt(value, 10);

		return new Date(now.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
	}

	if (value.includes("month")) {
		const months = parseInt(value, 10);

		now.setMonth(now.getMonth() + months);
		return now;
	}

	return now;
};

export default convertToDate;
