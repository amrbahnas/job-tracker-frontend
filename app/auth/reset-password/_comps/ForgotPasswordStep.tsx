"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSendResetCode } from "../../_api/mutations"
import Link from "next/link"
import { Lock, ArrowRight, ArrowLeft, Mail } from "lucide-react"
import { useTranslations } from "next-intl"

const forgotSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
})

export type ForgotPasswordValues = z.infer<typeof forgotSchema>

type ForgotPasswordStepProps = {
  onSuccess: (email: string) => void
}

export function ForgotPasswordStep({ onSuccess }: ForgotPasswordStepProps) {
  const { mutate: sendCode, loading } = useSendResetCode({})
  const t = useTranslations("auth.resetPassword.forgot")

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotSchema as any),
    defaultValues: { email: "" },
  })

  return (
    <>
      <div className="flex flex-col items-center gap-4 text-center">
        <span
          className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary"
          aria-hidden
        >
          <Lock className="size-7" />
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <Form<ForgotPasswordValues>
        form={form}
        onSubmit={(values) =>
          sendCode(values, {
            onSuccess: () => {
              onSuccess(values.email)
            },
          })
        }
        className="flex flex-col gap-5"
      >
        <FormItem name="email">
          <Input
            type="email"
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            iconStart={<Mail className="size-5 text-muted-foreground" />}
            aria-label={t("emailLabel")}
          />
        </FormItem>
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={loading}
          size="lg"
          loading={loading}
        >
          {t("sendCode")}
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </Form>

      <Link
        href="/auth"
        className="mx-auto inline-flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        {t("backToLogin")}
      </Link>

      <p className="text-center text-xs tracking-wide text-muted-foreground uppercase">
        {t("secureLine")}
      </p>
    </>
  )
}
