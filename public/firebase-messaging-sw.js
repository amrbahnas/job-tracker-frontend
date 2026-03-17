/* eslint-disable no-undef */
// Firebase messaging service worker
importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js"
)
importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js"
)

self.addEventListener("install", () => {
  console.log("Firebase messaging service worker installed")
})

self.addEventListener("activate", () => {
  console.log("Firebase messaging service worker activated")
})

const firebaseConfig = {
  apiKey: "AIzaSyBfa-cQYnHIxt10vn4hoelWdLzzvY-ycbY",
  authDomain: "mobile-app-e37af.firebaseapp.com",
  projectId: "mobile-app-e37af",
  storageBucket: "mobile-app-e37af.firebasestorage.app",
  messagingSenderId: "244027075373",
  appId: "1:244027075373:web:c357d9549dfcf5c572c1a4",
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload)

  const notificationTitle =
    payload.notification?.title || "Dawarly Notification"
  const notificationOptions = {
    body:
      payload.notification?.body ||
      payload.data?.message ||
      "You have a new Dawarly notification",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    data: payload.data,
    actions: [
      {
        action: "open",
        title: "Open",
      },
      {
        action: "close",
        title: "Close",
      },
    ],
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event)

  event.notification.close()

  if (event.action === "open") {
    const urlToOpen = event.notification.data?.url || "/"

    event.waitUntil(clients.openWindow(urlToOpen))
  } else {
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.focus()
            client.postMessage({
              type: "NOTIFICATION_CLICKED",
              data: event.notification.data,
            })
            return
          }
        }
        if (clients.openWindow) {
          return clients.openWindow("/")
        }
      })
    )
  }
})

self.addEventListener("notificationclose", (event) => {
  console.log("Notification closed:", event)
})
