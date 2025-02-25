import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyDIVX4oSteKJC2J1JxN6ka10Tq8A6rRf3Q",
	authDomain: "contacthub-9d4b8.firebaseapp.com",
	projectId: "contacthub-9d4b8",
	storageBucket: "contacthub-9d4b8.firebasestorage.app",
	messagingSenderId: "572784840604",
	appId: "1:572784840604:web:d203b74de707798294c259",
	measurementId: "G-SY4210LDLJ",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

if (typeof window !== "undefined" && navigator?.serviceWorker) {
	window.addEventListener("load", async () => {
		try {
			await navigator.serviceWorker.register("/firebase-messaging-sw.js");
		} catch (error) {
			console.error("Service Worker registration failed:", error);
		}
	});
}

export { messaging, getToken, onMessage };
