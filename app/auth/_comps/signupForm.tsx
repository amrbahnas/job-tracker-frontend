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
import ReCAPTCHA from "./ReCAPTCHA"
import { useTranslations } from "next-intl"

const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  recaptchaToken: z.string().min(1, "Please complete the ReCAPTCHA"),
  keepLoggedIn: z.boolean().optional(),
})

type SignupValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const { signup, loading } = useAuthActions()
  const t = useTranslations("auth.signup")

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
            placeholder={t("fullNamePlaceholder")}
            aria-label={t("fullNameLabel")}
            label={t("fullNameLabel")}
          />
        </FormItem>
        <FormItem name="email" textHelper="">
          <Input
            type="email"
            placeholder={t("emailPlaceholder")}
            aria-label={t("emailLabel")}
            label={t("emailLabel")}
          />
        </FormItem>
        <FormItem name="password">
          <PasswordInput label="Password" />
        </FormItem>
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
          {t("submit")}
        </Button>
      </Form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        {t("haveAccount")}{" "}
        <Link href="/auth?tab=login" className="text-primary hover:underline">
          {t("login")}
        </Link>
      </p>
    </>
  )
}
