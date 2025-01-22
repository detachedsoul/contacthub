/* eslint-disable @typescript-eslint/no-explicit-any */
interface CookieManager {
	set: (
		name: string,
		value: string,
		daysToExpire?: string | object,
		path?: string,
	) => void;
	get: (name: string) => string | null;
	delete: (name: string, path?: string) => void;
}

const cookieManager: CookieManager = {
	set: (
		name: string,
		value: string,
		daysToExpire: any = null,
		path: string = "/",
	): void => {
		let expires = "";

		if (daysToExpire !== null) {
            const expirationDate = calculateExpirationTime(daysToExpire);

			expires = `; expires=${new Date(expirationDate).toUTCString()}`;
		}

		document.cookie = `${name}=${encodeURIComponent(
			value,
		)}${expires}; path=${path}`;
	},

	get: (name: string): string | null => {
		const nameEQ = `${name}=`;

		const cookies = document.cookie.split("; ");

		for (const cookie of cookies) {
			if (cookie.startsWith(nameEQ)) {
				return decodeURIComponent(cookie.substring(nameEQ.length));
			}
		}
		return null;
	},

	delete: (name: string, path: string = "/"): void => {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
	},
};

function calculateExpirationTime(duration: any) {
	const now = new Date();

	if (typeof duration === "string") {
		const isoRegex =
			/^P(?:(\d+)Y)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
		const match = duration.match(isoRegex);

		if (!match) {
			throw new Error("Invalid ISO 8601 duration format.");
		}

		const [, years = 0, days = 0, hours = 0, minutes = 0, seconds = 0] =
			match.map(Number);

		now.setFullYear(now.getFullYear() + years);
		now.setDate(now.getDate() + days);
		now.setHours(now.getHours() + hours + 1);
		now.setMinutes(now.getMinutes() + minutes);
		now.setSeconds(now.getSeconds() + seconds);

		return now.toISOString();
	}

	if (typeof duration === "object" && duration !== null) {
		const {
			years = 0,
			days = 0,
			hours = 0,
			minutes = 0,
			seconds = 0,
		} = duration;

		now.setFullYear(now.getFullYear() + years);
		now.setDate(now.getDate() + days);
		now.setHours(now.getHours() + hours);
		now.setMinutes(now.getMinutes() + minutes);
		now.setSeconds(now.getSeconds() + seconds);

		return now.toISOString();
	}

	throw new Error(
		"Invalid duration input. Must be an ISO 8601 string or an object.",
	);
}

export default cookieManager;
