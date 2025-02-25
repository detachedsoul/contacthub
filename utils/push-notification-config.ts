import Parse from "@/utils/parse-config";
import { messaging, getToken } from "@/public/firebase";

export const requestNotificationPermission = async (userId: string) => {
	try {
		const permission = await Notification.requestPermission();

		if (permission === "granted") {
			if (messaging) {
				const token = await getToken(messaging, {
					vapidKey:
						"BMcGlOhGvXp80DxJUb1vGeyBo2rpGhgsXiGzqng8Lz_2NMuhaccKE3-_HDHAv7IzVon3T31RywuY3aZ24Y8rgP8",
				});

				await saveTokenToBack4App(userId, token);
			}

            return true;
        }

        return false;
	} catch (error) {
		console.error("Error getting FCM token:", error);
	}
};

export const saveTokenToBack4App = async (userId: string, fcmToken: string) => {
	const UserDetails = Parse.Object.extend("UserDetails");

	const query = new Parse.Query(UserDetails);

	try {
		const userDetails = await query.get(userId);

		userDetails.set("fcmToken", fcmToken);

		await userDetails.save();
	} catch (error) {
		console.error("Error saving token:", error);
	}
};
