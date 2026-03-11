"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Container from "@/components/ui/container"
import { ForgotPasswordStep } from "./ForgotPasswordStep"
import { VerifyCodeStep } from "./VerifyCodeStep"
import { SetNewPasswordStep } from "./SetNewPasswordStep"
import { useVerifyCode } from "../../_api/mutations"

type Step = 1 | 2 | 3

export default function ResetPassword() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")

  const { mutate: verifyCode, loading: verifyLoading } = useVerifyCode({})

  const handleResetSuccess = () => {
    router.push("/auth")
  }

  return (
    <main className="flex flex-1 items-center justify-center py-8" role="main">
      <Container className="flex justify-center">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="flex flex-col gap-6">
            {step === 1 && (
              <ForgotPasswordStep
                onSuccess={(email) => {
                  setEmail(email)
                  setStep(2)
                }}
              />
            )}
            {step === 2 && (
              <VerifyCodeStep
                email={email}
                verifyCode={(payload) =>
                  verifyCode(payload, {
                    onSuccess: (
                      _res,
                      variables: { email?: string; code?: string }
                    ) => {
                      if (variables.code) setCode(variables.code)
                      setStep(3)
                    },
                  })
                }
                verifyLoading={verifyLoading}
              />
            )}
            {step === 3 && (
              <SetNewPasswordStep
                email={email}
                code={code}
                onSuccess={handleResetSuccess}
              />
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}
