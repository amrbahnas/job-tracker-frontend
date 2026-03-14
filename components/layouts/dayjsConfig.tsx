"use client"

import { configureDayjs } from "@/client_config/dayjs"
import { useLocale } from "next-intl"
import { useEffect } from "react"

export default function DayjsConfig() {
  const local = useLocale()

  useEffect(() => {
    configureDayjs(local)
  }, [local])

  return null
}
