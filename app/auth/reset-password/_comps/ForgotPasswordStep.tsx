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
          Forgot Password?
        </h1>
        <p className="text-sm text-muted-foreground">
          No worries, it happens. Enter your email address and we&apos;ll send
          you a code to reset your password.
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
            label="Email Address"
            placeholder="alex@example.com"
            iconStart={<Mail className="size-5 text-muted-foreground" />}
            aria-label="Email Address"
          />
        </FormItem>
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={loading}
          size="lg"
          loading={loading}
        >
          Send Reset Code
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </Form>

      <Link
        href="/auth"
        className="mx-auto inline-flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to Login
      </Link>

      <p className="text-center text-xs tracking-wide text-muted-foreground uppercase">
        Secure • Encrypted • Private
      </p>
    </>
  )
}
