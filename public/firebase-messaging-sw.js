importScripts(
	"https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js",
);
importScripts(
	"https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js",
);

const firebaseConfig = {
	apiKey: "AIzaSyDIVX4oSteKJC2J1JxN6ka10Tq8A6rRf3Q",
	authDomain: "contacthub-9d4b8.firebaseapp.com",
	projectId: "contacthub-9d4b8",
	storageBucket: "contacthub-9d4b8.firebasestorage.app",
	messagingSenderId: "572784840604",
	appId: "1:572784840604:web:d203b74de707798294c259",
	measurementId: "G-SY4210LDLJ",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification?.title || "New Notification";

	const notificationOptions = {
		body: payload.notification?.body || "You have a new message.",
		icon: "/icon.png",
		badge: "/icon.png",
		vibrate: [200, 100, 200],
		actions: [
			{
				action: "open_dashboard",
				title: "Open Dashboard",
			},
		],
		data: {
			url: "https://contacthub.com.ng/dashboard",
		},
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
	const targetUrl =
		event.notification.data?.url || "https://contacthub.com.ng/dashboard";

	event.waitUntil(
		clients
			.matchAll({ type: "window", includeUncontrolled: true })
			.then((clientList) => {
				for (let client of clientList) {
					if (client.url === targetUrl && "focus" in client) {
						return client.focus();
					}
				}
				if (clients.openWindow) {
					return clients.openWindow(targetUrl);
				}
			}),
	);
});
