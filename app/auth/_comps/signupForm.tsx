"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import Link from "next/link"
import { useAuthActions } from "../_api/mutations"
import PasswordInput from "@/components/ui/password-input"

const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  keepLoggedIn: z.boolean().optional(),
})

type SignupValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const { signup, loading } = useAuthActions()

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema as any),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      keepLoggedIn: false,
    },
  })

  return (
    <>
      <Form<SignupValues>
        form={form}
        onSubmit={(values) => {
          signup(values)
        }}
        className="flex flex-col gap-4"
      >
        <FormItem name="fullName" textHelper="">
          <Input
            type="text"
            placeholder="Alex Johnson"
            aria-label="Full Name"
            label="Full Name"
          />
        </FormItem>
        <FormItem name="email" textHelper="">
          <Input
            type="email"
            placeholder="alex@company.com"
            aria-label="Email Address"
            label="Email Address"
          />
        </FormItem>
        <FormItem name="password">
          <PasswordInput label="Password" />
        </FormItem>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            {...form.register("keepLoggedIn")}
            className="size-4 rounded border-input"
          />
          <span className="text-sm">Keep me logged in</span>
        </label>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          size="lg"
          loading={loading}
        >
          Create Account
        </Button>
      </Form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth?tab=login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </>
  )
}
