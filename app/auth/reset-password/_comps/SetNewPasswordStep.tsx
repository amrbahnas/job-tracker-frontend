"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useResetPasswordMutation } from "../../_api/mutations"
import PasswordInput from "@/components/ui/password-input"
import Link from "next/link"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { useTranslations } from "next-intl"

const setPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string().min(1, "Re-enter your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SetNewPasswordValues = z.infer<typeof setPasswordSchema>

type SetNewPasswordStepProps = {
  email: string
  code: string
  onSuccess: () => void
}

export function SetNewPasswordStep({
  email,
  code,
  onSuccess,
}: SetNewPasswordStepProps) {
  const { mutate: resetPassword, loading } = useResetPasswordMutation({
    onSuccess,
  })
  const t = useTranslations("auth.resetPassword.setNew")

  const form = useForm<SetNewPasswordValues>({
    resolver: zodResolver(setPasswordSchema as any),
    defaultValues: { newPassword: "", confirmPassword: "" },
  })

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <Form<SetNewPasswordValues>
        form={form}
        onSubmit={(values) =>
          resetPassword({ email, otp: code, newPassword: values.newPassword })
        }
        className="flex flex-col gap-5"
      >
        <FormItem name="newPassword">
          <PasswordInput
            label={t("newPasswordLabel")}
            placeholder={t("newPasswordPlaceholder")}
            checkStrength={true}
          />
        </FormItem>
        <FormItem name="confirmPassword">
          <PasswordInput
            label={t("confirmLabel")}
            placeholder={t("confirmPlaceholder")}
            checkStrength={false}
          />
        </FormItem>
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={loading}
          size="lg"
          loading={loading}
        >
          <RotateCcw className="mr-2 size-4" aria-hidden />
          {t("submit")}
        </Button>
      </Form>

      <Link
        href="/auth"
        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        {t("backToSignIn")}
      </Link>
    </>
  )
}
