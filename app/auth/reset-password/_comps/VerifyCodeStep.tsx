"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useResendCode } from "../../_api/mutations"

import { ArrowRight, MailCheck } from "lucide-react"
import Link from "next/link"
import { OTPInput } from "@/components/ui/input-otp"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const verifySchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
})

export type VerifyCodeValues = z.infer<typeof verifySchema>

type VerifyCodeStepProps = {
  email: string
  verifyCode: (payload: { email: string; code: string }) => void
  verifyLoading: boolean
}

export function VerifyCodeStep({
  email,
  verifyCode,
  verifyLoading,
}: VerifyCodeStepProps) {
  const [resendCooldown, setResendCooldown] = useState(60)

  const { mutate: resendCode, loading: resendLoading } = useResendCode({
    onSuccess: () => {
      toast.success("Code resent successfully")
      setResendCooldown(60)
    },
  })

  useEffect(() => {
    if (resendCooldown <= 0) return
    const id = setInterval(() => setResendCooldown((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [resendCooldown])

  const form = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifySchema as any),
    defaultValues: { code: "" },
  })

  return (
    <>
      <div className="flex flex-col items-center gap-4 text-center">
        <span
          className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-hidden
        >
          <MailCheck className="size-7" />
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Check your email
        </h1>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a 6-digit verification code to{" "}
          <span className="font-semibold text-primary">{email}</span>. Enter it
          below to continue.
        </p>
      </div>

      <Form<VerifyCodeValues>
        form={form}
        onSubmit={(values) => verifyCode({ email, code: values.code })}
        className="flex flex-col gap-5"
      >
        <FormItem name="code">
          <OTPInput length={6} />
        </FormItem>
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={verifyLoading}
          size="lg"
          loading={verifyLoading}
        >
          Verify Code
          <span className="ml-2" aria-hidden>
            <ArrowRight className="size-4" />
          </span>
        </Button>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          onClick={() => resendCode({ email })}
          disabled={resendLoading || resendCooldown > 0}
          className="text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resendCooldown > 0
            ? `Resend code (${resendCooldown}s)`
            : "Resend code"}
        </button>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
        <Link href="/help" className="hover:underline">
          Help Center
        </Link>
        <span aria-hidden>·</span>
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        <span aria-hidden>·</span>
        <Link href="/support" className="hover:underline">
          Contact Support
        </Link>
      </div>
    </>
  )
}
