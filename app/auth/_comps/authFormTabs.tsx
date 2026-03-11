"use client"

import { useQueryState, parseAsStringLiteral } from "nuqs"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabParser = parseAsStringLiteral(["login", "signup"]).withDefault("login")
export type AuthTab = "login" | "signup"

export function AuthFormTabs() {
  const [tab, setTab] = useQueryState("tab", tabParser)

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as AuthTab)}
      className="w-full"
    >
      <TabsList className="h-12 w-full rounded-lg p-1">
        <TabsTrigger
          value="login"
          currentValue={tab}
          variant="card"
          className="flex-1"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          currentValue={tab}
          variant="card"
          className="flex-1"
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
