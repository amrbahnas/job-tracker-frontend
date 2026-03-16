"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import LocalScraperSection from "@/components/shared/LocalScraperSection"
import { useGenerateAndCreateWebsites } from "@/app/(dashboard)/websites/_api/mutations"
import { useGetTokenForDesktop } from "@/app/(dashboard)/scrape-locally/_api/queries"
import { toast } from "sonner"
import { Field, FieldLabel } from "@/components/ui/field"
import { parseAsInteger, useQueryState } from "nuqs"
import { Microphone } from "@/components/common/microphone"

const STEPS = 3

export default function OnboardingView() {
  const t = useTranslations("onboarding")
  const tScrape = useTranslations("scrapeLocally")
  const router = useRouter()
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(1))
  const [description, setDescription] = useState("")

  const { generateAndCreate, loading: generating } =
    useGenerateAndCreateWebsites()
  const {
    data: tokenData,
    loading: tokenLoading,
    refetch: refetchToken,
  } = useGetTokenForDesktop()
  const token = tokenData?.token ?? ""

  const handleDescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = description.trim()
    if (!trimmed || generating) return
    generateAndCreate({ description: trimmed }, {
      onSuccess: () => {
        toast.success(t("step1.toastSuccess"))
        setStep(2)
      },
    } as any)
  }

  const handleGetToken = () => {
    refetchToken().then((result) => {
      const tkn = result.data?.token
      if (tkn) {
        navigator.clipboard.writeText(tkn).then(() => {
          toast.success(tScrape("token.toastCopied"))
        })
      }
    })
  }

  const copyToken = async () => {
    if (!token) return
    try {
      await navigator.clipboard.writeText(token)
      toast.success(tScrape("token.toastCopied"))
    } catch {
      toast.error(tScrape("token.toastCopyError"))
    }
  }

  const goToJobs = () => router.replace("/jobs")

  const progressValue = (step / STEPS) * 100

  return (
    <main className="mx-auto mt-6 max-w-2xl space-y-8">
      <Field className="w-full">
        <FieldLabel htmlFor="progress-upload">
          <span>{step === 1 && t("step1.title")}</span>
          <span>{step === 2 && t("step2.title")}</span>
          <span>{step === 3 && t("step3.title")}</span>
          <span className="ml-auto">{Math.round(progressValue)}%</span>
        </FieldLabel>
        <Progress value={progressValue} className="h-2" />
      </Field>

      {step === 1 && (
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" aria-hidden />
            <h1 className="text-xl font-semibold text-foreground">
              {t("step1.title")}
            </h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("step1.description")}
          </p>

          {generating ? (
            <div
              className="flex flex-col items-center justify-center gap-6 py-10"
              aria-live="polite"
              aria-busy="true"
            >
              <Loader2
                className="h-12 w-12 animate-spin text-primary"
                aria-hidden
              />
              <div className="space-y-1 text-center">
                <p className="font-medium text-foreground">
                  {t("step1.generatingTitle")}
                </p>
                <p className="max-w-[280px] text-sm text-muted-foreground">
                  {t("step1.generatingDescription")}
                </p>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60"
                    )}
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleDescriptionSubmit}
              className="relative mt-4 flex flex-col gap-4"
            >
              <span className="absolute inset-e-2 top-2">
                <Microphone onVoiceInput={setDescription} />
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("step1.placeholder")}
                className={cn(
                  "min-h-[120px] w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                )}
                disabled={generating}
                autoFocus
                aria-label={t("step1.placeholder")}
              />
              <Button type="submit" disabled={!description.trim()}>
                {t("step1.submit")}
              </Button>
            </form>
          )}
        </section>
      )}

      {step === 2 && (
        <>
          <section className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              {t("step2.title")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("step2.description")}
            </p>
          </section>
          <LocalScraperSection
            token={token}
            loading={tokenLoading}
            onGetToken={handleGetToken}
            onCopyToken={copyToken}
            showHeader={false}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={goToJobs}>
              {t("step2.skip")}
            </Button>
            <Button onClick={() => setStep(3)}>{t("step2.continue")}</Button>
          </div>
        </>
      )}

      {step === 3 && (
        <section className="flex flex-col items-center rounded-lg border bg-card p-8 text-center shadow-sm">
          <CheckCircle2 className="size-14 text-primary" aria-hidden />
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            {t("step3.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">{t("step3.description")}</p>
          <Button className="mt-6" size="lg" onClick={goToJobs}>
            {t("step3.goToJobs")}
          </Button>
        </section>
      )}
    </main>
  )
}
