import { initializeApp } from "firebase/app"
import {
  getMessaging,
  getToken,
  onMessage,
  Messaging,
} from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyBfa-cQYnHIxt10vn4hoelWdLzzvY-ycbY",
  authDomain: "mobile-app-e37af.firebaseapp.com",
  projectId: "mobile-app-e37af",
  storageBucket: "mobile-app-e37af.firebasestorage.app",
  messagingSenderId: "244027075373",
  appId: "1:244027075373:web:c357d9549dfcf5c572c1a4",
} as const

const app = initializeApp(firebaseConfig)

let messaging: Messaging | null = null

if (typeof window !== "undefined") {
  messaging = getMessaging(app)
}

const requestPermission = async () => {
  if (typeof window === "undefined" || !("Notification" in window))
    return "denied"
  return await Notification.requestPermission()
}

const ensureServiceWorkerReady = async () => {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return

  const existingRegistration = await navigator.serviceWorker.getRegistration()

  let registration = existingRegistration
  if (
    !registration ||
    !registration.active?.scriptURL.includes("firebase-messaging-sw.js")
  ) {
    registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    )
  }

  await navigator.serviceWorker.ready

  const activeWorker =
    registration.active || registration.waiting || registration.installing

  if (!activeWorker) {
    throw new Error("Service worker is not active")
  }

  if (activeWorker.state !== "activated") {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Service worker activation timeout"))
      }, 10000)

      activeWorker.addEventListener("statechange", () => {
        if (activeWorker.state === "activated") {
          clearTimeout(timeout)
          resolve(true)
        } else if (activeWorker.state === "redundant") {
          clearTimeout(timeout)
          reject(new Error("Service worker became redundant"))
        }
      })
    })
  }

  if (!navigator.serviceWorker.controller) {
    await new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve(true)
      }, 3000)

      navigator.serviceWorker.addEventListener(
        "controllerchange",
        () => {
          clearTimeout(timeout)
          resolve(true)
        },
        { once: true }
      )

      if (navigator.serviceWorker.controller) {
        clearTimeout(timeout)
        resolve(true)
      }
    })
  }

  return registration
}

export const requestNotificationPermission = async () => {
  const perm = await requestPermission()
  await ensureServiceWorkerReady()
  if (perm !== "granted" || !messaging) return null

  const vapidKey =
    "BPLgk5nFWqwU7LwMEvuC6EFUtGnUJVcy0IDVRgxS1pRF7vsJzgOIp7JL6uQdc2TkXSA2UrDvidP-ECeUPBQjXIk"

  return await getToken(messaging, { vapidKey })
}

export const onMessageListener = async (callback: (payload: any) => void) => {
  if (!messaging) return () => {}
  try {
    return onMessage(messaging, callback)
  } catch (error) {
    console.error("Error setting up message listener:", error)
    return () => {}
  }
}
