"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuthActions } from "../_api/mutations"
import Link from "next/link"
import PasswordInput from "@/components/ui/password-input"
import ReCAPTCHA from "./ReCAPTCHA"

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  recaptchaToken: z.string().min(1, "Please complete the ReCAPTCHA"),
  keepLoggedIn: z.boolean().optional(),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const { login, loading } = useAuthActions()

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: {
      email: "",
      password: "",
      keepLoggedIn: false,
    },
  })

  return (
    <>
      <Form<LoginValues>
        form={form}
        onSubmit={(values) => {
          login(values)
        }}
        className="flex flex-col gap-6"
      >
        <FormItem name="email">
          <Input
            type="email"
            label="Email Address"
            placeholder="alex@company.com"
            aria-label="Email Address"
          />
        </FormItem>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <Link
              href="/auth/reset-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <FormItem name="password">
            <PasswordInput checkStrength={false} />
          </FormItem>
        </div>
        {/* <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            {...form.register("keepLoggedIn")}
            className="size-4 rounded border-input"
          />
          <span className="text-sm">Keep me logged in</span>
        </label> */}
        <ReCAPTCHA
          onChange={(token) => {
            form.setValue("recaptchaToken", token, { shouldValidate: true })
          }}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          size="lg"
          loading={loading}
        >
          Sign In
        </Button>
      </Form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth?tab=signup" className="text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </>
  )
}
