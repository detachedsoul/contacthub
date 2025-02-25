importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");

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
	console.log("[firebase-messaging-sw.js] Background message received", payload);

	self.registration.showNotification(payload.notification.title, {
		body: payload.notification.body,
		icon: "/icon.png",
	});
});
