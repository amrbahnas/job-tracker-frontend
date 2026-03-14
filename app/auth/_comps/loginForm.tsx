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
import { useTranslations } from "next-intl"
import { Error } from "@/components/common/error"

const loginSchema = (validationT: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z.string().email(validationT("emailInvalid")),
    password: z.string().min(8, validationT("passwordMin")),
    recaptchaToken: z.string().min(1, validationT("recaptchaRequired")),
    keepLoggedIn: z.boolean().optional(),
  })

type LoginValues = z.infer<ReturnType<typeof loginSchema>>

export function LoginForm() {
  const { login, loading } = useAuthActions()
  const t = useTranslations("auth.login")
  const validationT = useTranslations("auth.validation")

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema(validationT) as any),
    defaultValues: {
      email: "",
      password: "",
      keepLoggedIn: false,
    },
  })

  const { errors } = form.formState

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
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            aria-label={t("emailLabel")}
          />
        </FormItem>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">{t("passwordLabel")}</Label>
            <Link
              href="/auth/reset-password"
              className="text-sm text-primary hover:underline"
            >
              {t("forgot")}
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
        <Error error={errors.recaptchaToken} />
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
        {t("noAccount")}{" "}
        <Link href="/auth?tab=signup" className="text-primary hover:underline">
          {t("createAccount")}
        </Link>
      </p>
    </>
  )
}
