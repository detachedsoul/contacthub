/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";

function getkeyString(str) {
	return str.split("").reverse().join("").replace("==eee", "");
}

// export const decryptResponse = (Base64CBC: string): string => {
// 	if (!Base64CBC || typeof Base64CBC !== "string") {
// 		throw new Error("Invalid encrypted data");
// 	}

// 	const keyString = getkeyString("=E0SiBnLzAHPzYzZeee==");
// 	const parsedKey = CryptoJS.enc.Utf8.parse(keyString.padEnd(32, " ")); // Ensure correct length

// 	console.log("Parsed Key:", parsedKey.toString());

// 	const iv = CryptoJS.enc.Utf8.parse("BBBBBBBBBBBBBBBB");

// 	console.log("IV:", iv.toString());

// 	const decrypted = CryptoJS.AES.decrypt(Base64CBC, parsedKey, {
// 		iv: iv,
// 		mode: CryptoJS.mode.CBC,
// 	});

// 	const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
// 	if (!decryptedText) {
// 		throw new Error("Decryption failed: empty result");
// 	}

// 	return decryptedText;
// };

export const encryptPayload = (data: any): { data: string } => {
	const parsedKey = CryptoJS.enc.Utf8.parse(
		getkeyString("=E0SiBnLzAHPzYzZeee=="),
	);

	const iv = CryptoJS.enc.Utf8.parse("BBBBBBBBBBBBBBBB");

	const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), parsedKey, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
	});

	const encrypted_data = { data: encrypted.toString() };

	return encrypted_data;
};

export const decryptResponse = (Base64CBC: string): string => {
	const key = CryptoJS.enc.Utf8.parse(getkeyString("=E0SiBnLzAHPzYzZeee=="));

	const iv = CryptoJS.enc.Utf8.parse("BBBBBBBBBBBBBBBB");

	const getDecryptedData = CryptoJS.AES.decrypt(Base64CBC, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
    });

    const decryptedData = getDecryptedData.toString(CryptoJS.enc.Utf8);

	return decryptedData;
};
