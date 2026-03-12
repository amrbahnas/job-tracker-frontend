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

type Options = {
  onNotificationReceived?: () => void
}

const playBeep = () => {
  const audio = new Audio("/sounds/sen_message_sound.mp3")
  audio.play()
}

export const useFirebaseNotifications = (options: Options = {}) => {
  const unsubscribeRef = useRef<null | (() => void)>(null)
  const { refetch } = useRefetch(JOBS_KEYS.getJobs)
  const user = useAppStore((s) => s.user)

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        if (!user?._id) return

        const token = await requestNotificationPermission()
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

        unsubscribeRef.current = await onMessageListener((payload) => {
          refetch()
          playBeep()
          const title = payload.notification?.title || "New notification"
          const body =
            payload.notification?.body ||
            payload.data?.message ||
            "You have a new notification"

          toast.success(`${title} - ${body}`)

          options.onNotificationReceived?.()
        })

        const handleServiceWorkerMessage = (event: MessageEvent) => {
          if (
            (event.data as any)?.type &&
            (event.data as any).type === "NOTIFICATION_CLICKED"
          ) {
            options.onNotificationReceived?.()
          }
        }

        navigator.serviceWorker?.addEventListener(
          "message",
          handleServiceWorkerMessage
        )

        return () => {
          navigator.serviceWorker?.removeEventListener(
            "message",
            handleServiceWorkerMessage
          )
        }
      } catch (error) {
        console.error("Error initializing Firebase notifications:", error)
      }
    }

    void initializeNotifications()

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [options, user?._id])
}

export default useFirebaseNotifications
