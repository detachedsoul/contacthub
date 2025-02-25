import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

const PARSE_APPLICATION_ID = "plbXUCZ8nfi2lwLxmNXKXNZSYRvWAAXWt0bs39Vz";
const PARSE_REST_API_KEY = "StSQx6j9aM1bemNJJzUBe4JmI1CpaAK5mOkhjsr8";
const PARSE_HOST_URL = "https://parseapi.back4app.com";

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: "contacthub-9d4b8",
			clientEmail:
				"firebase-adminsdk-fbsvc@contacthub-9d4b8.iam.gserviceaccount.com",
			privateKey:
				"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8rANFavOY8Azv\nQ6/wEEUWxh4QN8SOnPnmIkKog+3exH9qekSmoa4+1ZcZIugD43SYk6lecdA6X5Ob\nLnPd3VH3xi77vH3azS39WHWH7v8rS/RxBn/bvxRTsB9gkhMTdtpQxbTJgLG/19tm\nAtU7v/hwT0fd/csAirzC3BzUOyP2RhW+ZmHqC1SyPQEf4RYiK6LhwM/I3yH0xGoS\nlAM/pNUvbfJ5R3MSqGjmHHq5qyT71FHY5+KW1/AZKIUdvdeJSBTj1gZ4WX8rExQy\nvEkVj1Iq8o6GFswWR3AxPJ02qEdPfMAHqddSTev1VZk4Cqrt3K3RN22Uc2nvCdTT\nap19ba6fAgMBAAECggEACwyPzHrs9SHpwAFYxlhNk33auNxrOGbdA6sx+Chxv8AG\nLjgm2RNS3v8nMCOpLsEdTOoo2w0TQrfiLw5TXsTdTgNfMQLi4/NsJBAQIfvPGbwC\n/rOAvV+9UwFXdRJY56ToOB677akJv9BmWt0Dm9IsPHeIH+oC/28gitDVJ2CnRH7Q\nVGEciPTxN10scZvSSUWXNPZ2R12X/mSdyhzFN8dpxt6KrLo0XtAnw3G/iHd7NzI+\nyOXcwxu0oaGDi0nt4/c0lA3UrY+PkxHV4cFHgYzHBcGVioFkA33LifctgrMsg3yE\naliTDzbndTRqIBUQNyHmxyRHhCW2bv5koe/pwE/P4QKBgQD1tb+FAm2Ip/qxvcZy\n6tAE7/pL79gvnvbxv+5vhNnOGh87QLBIRc6j+O+zaDdVU+KAmx28SOYE/f7NOyw7\nt21tzZgCMYu7KWJkZeMehnau6EXYbUi2Lg6cE0wg3owD27zRysyWfZxtImNJSSTJ\n620pM4g1nd68Hrwxx/cdQOxQ9wKBgQDEksLRBwA8nJNujBu2OEzG/t76dFEHJZp/\nel0M9Mf9MU0DCuh4PUYv8TWmwOjTnOh6/KVaZnW83A3CPKabj1ium1nZXIhSCd36\n7uwGfCJWhKsoSKJtoJjxe0YIKJLHE6GFdX6TsCS16YAH3M8uPJdpVQr0syFhU6Zf\n68xeNCFNmQKBgCt4w3C59D0oUx9dTx4H01P8TVFgFuSeAFzXM01BuPNRBdOK52Vy\nDFRQd8BLIPcUx08vonwsfZ3Gfm07GeFa256AsHM65tjvQnw21o8RBTB+4dSfySyK\nS4VrmJ18IlOQbgDEG5xIjwN0ARL3QO4EnCSc/G1YCA9KdMtt8JeZY/YTAoGAeIUW\nprupHIBPMCb80pLgF92p7lqkV0Jp4CCwrkHh3817TxNABoBi6P/1igCafyujqcv+\nwVcydpFgaidvas7Pa3ZZ9xdxiQL9s10LHsq67tq2aaNm2tntC5kuDdB6dU4G6OFp\nsrj7OQEpeyiZadrCZlU6u16cZ6S2y/axPUyu4nkCgYEA68MphpnJxHLj6dLa3DD9\n3XQjGITMNf8NkJCrD3N2ElljamWPgWitHvRMBgjmigqWpYsxM2ljONicRMnhL3Sc\n66/75hfTna8Tt667kc5ZWSTONvfC8GcMjoiL8KAvRW9F7hwqjCg5Nu/436h92r44\npsAs7AMk7rFaZNX8fRT2w6Q=\n-----END PRIVATE KEY-----\n",
		}),
	});
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	try {
		const userQueryUrl = `${PARSE_HOST_URL}/classes/UserDetails?where=${encodeURIComponent(
			JSON.stringify({ fcmToken: { $exists: true } }),
		)}`;

		const userResponse = await fetch(userQueryUrl, {
			method: "GET",
			headers: {
				"X-Parse-Application-Id": PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY,
				"Content-Type": "application/json",
			},
		});

		if (!userResponse.ok) {
			throw new Error("Failed to fetch users.");
		}

		const userData = await userResponse.json();

		const tokens: string[] = userData.results
			.map((user: { fcmToken?: string }) => user.fcmToken)
			.filter((token: string) => Boolean(token));

		if (tokens.length === 0) {
			return res.status(200).json({
				message:
					"No active users with notifications enabled to send notifications",
			});
		}

		const chunkArray = <T>(array: T[], size: number): T[][] => {
			return Array.from(
				{ length: Math.ceil(array.length / size) },
				(_, i) => array.slice(i * size, i * size + size),
			);
		};

		const tokenChunks = chunkArray(tokens, 500);
		const failedTokens: string[] = [];
		const responses = [];

		for (const chunk of tokenChunks) {
			const payload = {
				notification: {
					title: "New Listing",
					body: "A new user just listed! Go to your dashboard to check it out!",
				},
				webpush: {
					notification: {
						icon: "/icon.png",
						click_action: "https://contacthub.com.ng/dashboard",
					},
				},
				android: {
					notification: {
						title: "New Listing",
						body: "A new user just listed! Go to your dashboard to check it out!",
						icon: "/icon.png",
						click_action: "https://contacthub.com.ng/dashboard",
					},
				},
				apns: {
					payload: {
						aps: {
							alert: {
								title: "New Listing",
								body: "A new user just listed! Go to your dashboard to check it out!",
							},
							sound: "default",
							badge: 1,
							category: "NEW_LISTING",
						},
						customData: {
							link: "https://contacthub.com.ng/dashboard",
						},
					},
				},
				tokens: chunk,
			};

			try {
				const response = await admin
					.messaging()
					.sendEachForMulticast(payload);

				response.responses.forEach((resp, index) => {
					if (!resp.success) {
						failedTokens.push(chunk[index]);
					}
				});

				responses.push(response);
			} catch (error) {
				console.error("Error sending notification batch:", error);
			}
		}

		res.status(200).json({
			message: "Notification sent",
			data: responses,
			...(failedTokens.length > 0 && { invalidTokens: failedTokens }),
		});
	} catch (error) {
		console.error("Error sending notification:", error);
		res.status(500).json({ error: "Failed to send notification" });
	}
}
