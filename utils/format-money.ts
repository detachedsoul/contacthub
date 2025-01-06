export function formatAmount({
	amount,
	noDecimal = false,
	showCurrency = true,
}: {
	amount: string | number;
	noDecimal?: boolean;
	showCurrency?: boolean;
}): string | null {
	const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

	if (isNaN(numAmount)) {
		return null;
	}

	// Define the options for formatting
	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: noDecimal ? 0 : 2,
		maximumFractionDigits: noDecimal ? 0 : 2,
	};

	const currencyOptions: Intl.NumberFormatOptions = {
		...options,
		style: "currency",
		currency: "NGN",
	};

	// Create a formatter for the given locale (assuming 'en-US' here for comma separation)
	const formatter = new Intl.NumberFormat("en-NG", options);

	if (showCurrency) {
		return new Intl.NumberFormat("en-NG", currencyOptions).format(
			numAmount,
		);
	}

	return formatter.format(numAmount);
}
