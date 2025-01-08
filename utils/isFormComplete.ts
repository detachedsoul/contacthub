const isFormFieldsComplete = (formValues: object | []) => {
	return Object.values(formValues).every((value) => value !== "");
};

export default isFormFieldsComplete;
