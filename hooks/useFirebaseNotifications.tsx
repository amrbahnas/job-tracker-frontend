"use client"

import { useEffect, useRef } from "react"
import proxyClient from "@/api_config/proxyClient"
import useAppStore from "@/store/useAppStore"
import {
  onMessageListener,
  requestNotificationPermission,
} from "@/firebase/firebaseClient"
import { toast } from "sonner"
import { useRefetch } from "@/api_config/useRefetch"
import JOBS_KEYS from "@/app/(dashboard)/jobs/_api/keys"

const PUSH_HINT_SESSION_KEY = "push_unavailable_hint_shown"

type Options = {
  onNotificationReceived?: () => void
}

const playBeep = () => {
  const audio = new Audio("/sounds/sen_message_sound.mp3")
  audio.play()
}

const showPushUnavailableHint = (kind: "unsupported" | "environment") => {
  try {
    if (sessionStorage.getItem(PUSH_HINT_SESSION_KEY)) return
    sessionStorage.setItem(PUSH_HINT_SESSION_KEY, "1")
  } catch {
    // sessionStorage may be unavailable
  }

  const description =
    kind === "unsupported"
      ? "This browser does not support web push, or it is disabled."
      : "Push could not start (often blocked by strict privacy settings). In Brave, try Shields down for this site or allow notifications, then refresh."

  toast.message("Notifications unavailable", {
    description,
    duration: 10_000,
  })
}

export const useFirebaseNotifications = (options: Options = {}) => {
  const unsubscribeRef = useRef<null | (() => void)>(null)
  const { refetch } = useRefetch(JOBS_KEYS.getJobs)
  const user = useAppStore((s) => s.user)
  const onNotificationReceivedRef = useRef(options.onNotificationReceived)

  useEffect(() => {
    onNotificationReceivedRef.current = options.onNotificationReceived
  }, [options.onNotificationReceived])

  useEffect(() => {
    let cancelled = false

    const handleServiceWorkerMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string } | undefined
      if (data?.type === "NOTIFICATION_CLICKED") {
        onNotificationReceivedRef.current?.()
      }
    }

    const initializeNotifications = async () => {
      try {
        if (!user?._id) return

        const { token, skippedReason } = await requestNotificationPermission()

        if (skippedReason === "unsupported") {
          showPushUnavailableHint("unsupported")
        } else if (
          skippedReason === "service_worker" ||
          skippedReason === "token_failed"
        ) {
          showPushUnavailableHint("environment")
        }

        if (token) {
          const topic = `user-${user._id}`
          try {
            await proxyClient.post("/notifications/subscribe-topic", {
              token,
              topic,
            })
          } catch (error) {
            console.error("Error subscribing to topic:", error)
          }
        }

        if (cancelled) return

        unsubscribeRef.current = await onMessageListener((payload) => {
          refetch()
          playBeep()
          const title = payload.notification?.title || "New notification"
          const body =
            payload.notification?.body ||
            payload.data?.message ||
            "You have a new notification"

          toast.success(`${title} - ${body}`)

          onNotificationReceivedRef.current?.()
        })

        if (cancelled) {
          unsubscribeRef.current?.()
          unsubscribeRef.current = null
          return
        }

        navigator.serviceWorker?.addEventListener(
          "message",
          handleServiceWorkerMessage
        )
      } catch (error) {
        console.error("Error initializing Firebase notifications:", error)
      }
    }

    void initializeNotifications()

    return () => {
      cancelled = true
      navigator.serviceWorker?.removeEventListener(
        "message",
        handleServiceWorkerMessage
      )
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
    }
  }, [refetch, user?._id])
}

export default useFirebaseNotifications
