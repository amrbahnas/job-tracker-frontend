import { initializeApp } from "firebase/app"
import {
  getMessaging,
  getToken,
  isSupported,
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

let messagingInstance: Messaging | null = null
let messagingPromise: Promise<Messaging | null> | null = null

async function resolveMessaging(): Promise<Messaging | null> {
  if (typeof window === "undefined") return null
  if (messagingInstance) return messagingInstance
  if (!messagingPromise) {
    messagingPromise = (async () => {
      try {
        if (!(await isSupported())) return null
        messagingInstance = getMessaging(app)
        return messagingInstance
      } catch {
        return null
      }
    })()
  }
  return messagingPromise
}

const requestPermission = async () => {
  if (typeof window === "undefined" || !("Notification" in window))
    return "denied"
  return await Notification.requestPermission()
}

const ensureServiceWorkerReady = async () => {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    throw new Error("Service workers are not available")
  }

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

export type PushNotificationInitResult = {
  token: string | null
  skippedReason?:
    | "unsupported"
    | "permission_denied"
    | "service_worker"
    | "token_failed"
}

export const requestNotificationPermission =
  async (): Promise<PushNotificationInitResult> => {
    const messaging = await resolveMessaging()
    if (!messaging) {
      return { token: null, skippedReason: "unsupported" }
    }

    const perm = await requestPermission()

    try {
      await ensureServiceWorkerReady()
    } catch {
      return { token: null, skippedReason: "service_worker" }
    }

    if (perm !== "granted") {
      return { token: null, skippedReason: "permission_denied" }
    }

    const vapidKey =
      "BPLgk5nFWqwU7LwMEvuC6EFUtGnUJVcy0IDVRgxS1pRF7vsJzgOIp7JL6uQdc2TkXSA2UrDvidP-ECeUPBQjXIk"

    try {
      const token = await getToken(messaging, { vapidKey })
      if (!token) return { token: null, skippedReason: "token_failed" }
      return { token }
    } catch {
      return { token: null, skippedReason: "token_failed" }
    }
  }

export const onMessageListener = async (callback: (payload: any) => void) => {
  const messaging = await resolveMessaging()
  if (!messaging) return () => {}
  try {
    return onMessage(messaging, callback)
  } catch (error) {
    console.error("Error setting up message listener:", error)
    return () => {}
  }
}
