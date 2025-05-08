"use strict";
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyC6wkE2lCppUXdrn_5ChcyRuF1A9vacEA4",
  authDomain: "diary-f8127.firebaseapp.com",
  databaseURL: "https://diary-f8127.firebaseio.com",
  projectId: "diary-f8127",
  storageBucket: "diary-f8127.appspot.com",
  messagingSenderId: "273281593934",
  appId: "1:273281593934:web:ec3d368ccf9b218aff891f",
  measurementId: "G-K4ZN80VQV4",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  self.registration.showNotification(payload.data.title, {
    body: payload.data.body,
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.target.origin));
});
