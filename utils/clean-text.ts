const cleanText = (value: string) => {
	return value
		.replace(/[^a-zA-Z\s'._-]/g, "")
		.replace(/(^[-'._]+|[-'._]+$)/g, "")
		.replace(/\s{2,}/g, " ")
		.trim();
};

export default cleanText;
