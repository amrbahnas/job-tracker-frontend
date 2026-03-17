"use client"

import { useJobActions } from "@/app/(dashboard)/jobs/_api/mutations"
import { useGetTokenForDesktop } from "@/app/(dashboard)/scrape-locally/_api/queries"
import { useGenerateAndCreateWebsites } from "@/app/(dashboard)/websites/_api/mutations"
import { Microphone } from "@/components/common/microphone"
import LocalScraperSection from "@/components/shared/LocalScraperSection"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle2, Database, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const STEPS = 3

export default function OnboardingView() {
  const t = useTranslations("onboarding")
  // const { scrapeJobs, isScrapingJobs } = useJobActions()
  const tScrape = useTranslations("scrapeLocally")
  const router = useRouter()
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(1))
  const [description, setDescription] = useState("")
  const [generatingStep, setGeneratingStep] = useState(false)
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
    setTimeout(() => {
      setGeneratingStep(true)
    }, 3000)
    generateAndCreate({ description: trimmed }, {
      onSuccess: () => {
        toast.success(t("step1.toastSuccess"))
        setGeneratingStep(false)
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

  const stepLabel: Record<number, string> = {
    1: t("stepLabel1"),
    2: t("stepLabel2"),
    3: t("stepLabel3"),
  }

  if (generatingStep) {
    return <GeneratingStep step={step} stepLabel={stepLabel} />
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-4xl flex-col justify-center px-4">
      {step !== 3 && (
        <div className="mb-8">
          <Field className="w-full">
            <FieldLabel
              htmlFor="progress-upload"
              className="w-full items-center justify-between gap-3"
            >
              <span className="text-xs font-bold text-primary sm:text-sm">
                {t("step", { step, steps: STEPS })}
              </span>
              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                {t("completed", { progress: Math.round(progressValue) })}
              </span>
            </FieldLabel>
            <Progress value={progressValue} dir="rtl" className="mt-3 h-3" />
            <span className="text-xs font-medium text-muted-foreground sm:text-sm">
              {stepLabel[step as keyof typeof stepLabel]}
            </span>
          </Field>
        </div>
      )}

      {step === 1 && (
        <section className="animate-fadeIn relative">
          <div className="relative max-w-xl space-y-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t("step1.title")}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("step1.description")}
            </p>
          </div>

          <>
            <form
              onSubmit={handleDescriptionSubmit}
              className="relative mt-4 flex flex-col gap-4"
            >
              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="mb-3 block text-sm font-semibold"
                >
                  {t("step1.label")}
                </label>
                <span className="my-2 block">
                  <Microphone onVoiceInput={setDescription} />
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("step1.placeholder")}
                  className={cn(
                    "min-h-[160px] w-full resize-none rounded-3xl border border-input bg-background px-4 py-4 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 sm:text-base"
                  )}
                  disabled={generating}
                  autoFocus
                  aria-label={t("step1.placeholder")}
                />
              </div>
              <footer className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
                <Button
                  type="submit"
                  disabled={!description.trim()}
                  size="lg"
                  className="flex-1 sm:h-12 rtl:flex-row-reverse"
                  loading={generating}
                >
                  {t("step1.submit")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={() => setStep(2)}
                  className="w-full sm:h-12 sm:w-auto sm:min-w-[180px]"
                  disabled={generating}
                >
                  {t("skip")}
                </Button>
              </footer>
            </form>

            <div className="mt-6 flex items-start gap-2 rounded-2xl bg-primary/5 px-4 py-3 text-xs text-muted-foreground sm:text-sm">
              <span className="mt-0.5 text-primary">💡</span>
              <p>{t("step1.tip")}</p>
            </div>
          </>
        </section>
      )}

      {step === 2 && (
        <section className="animate-fadeIn space-y-6 rounded-3xl bg-card/80 p-8 shadow-lg ring-1 ring-border/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                {t("step2.title")}
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("step2.description")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <LocalScraperSection
              token={token}
              loading={tokenLoading}
              onGetToken={handleGetToken}
              onCopyToken={copyToken}
              showHeader={false}
            />

            <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Database className="h-5 w-5 shrink-0" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t("step2.boostTitle")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("step2.boostDescription")}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-muted-foreground sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{t("step2.bullet1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{t("step2.bullet2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{t("step2.bullet3")}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
            <Button
              variant="outline"
              onClick={() => setStep(3)}
              className="order-2 w-full sm:order-1 sm:w-auto"
            >
              {t("skip")}
            </Button>
            <Button
              onClick={() => setStep(3)}
              className="order-1 w-full sm:order-2 sm:w-auto"
              size="lg"
            >
              {t("step2.continue")}
            </Button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="animate-fadeIn mt-14 flex flex-1 flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
            <CheckCircle2 className="h-10 w-10" aria-hidden />
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("step3.title")}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("step3.description")}
          </p>
          <Button className="mt-7 w-full max-w-xs" size="lg" onClick={goToJobs}>
            {t("step3.goToJobs")}
          </Button>
        </section>
      )}
    </main>
  )
}

const GeneratingStep = ({
  step,

  stepLabel,
}: {
  step: number

  stepLabel: Record<number, string>
}) => {
  const t = useTranslations("onboarding")
  const [progress, setProgress] = useState(33)
  useEffect(() => {
    if (progress === 80) return
    const interval = setInterval(() => {
      if (progress === 80) return
      setProgress(progress + 1)
    }, 100)
    return () => clearInterval(interval)
  }, [progress])
  return (
    <div
      className="animate-fadeIn flex min-h-[calc(100vh-120px)] items-center justify-center px-4"
      aria-live="polite"
      aria-busy="true"
    >
      <section className="w-full max-w-md rounded-3xl bg-card p-8 text-center shadow-xl">
        <h1 className="mt-6 animate-pulse text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {t("step1.generatingTitle")}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t("step1.generatingDescription")}
        </p>

        <div className="mt-6 space-y-2 text-start text-xs font-medium tracking-[0.16em] text-muted-foreground">
          <p>{t("step", { step, steps: STEPS })}</p>
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-primary">
              {stepLabel[step as keyof typeof stepLabel]}
            </span>
            <span className="text-foreground">
              {t("completed", { progress: Math.round(progress) })}
            </span>
          </div>
        </div>

        <Progress value={progress} className="mt-3 h-2" />

        <div className="mt-6 space-y-3 text-start text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-500">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            </span>
            <div>
              <p className="font-medium text-foreground">
                {t("step1.generatingIdentityVerifiedTitle")}
              </p>
              <p className="text-[11px] text-muted-foreground sm:text-xs">
                {t("step1.generatingIdentityVerifiedDescription")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            {progress >= 66 ? (
              <span className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-500">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              </span>
            ) : (
              <span className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              </span>
            )}
            <div>
              <p className="font-medium text-foreground">
                {t("step1.generatingFetchingSourcesTitle")}
              </p>
              <p className="text-[11px] text-muted-foreground sm:text-xs">
                {t("step1.generatingFetchingSourcesDescription")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 opacity-70">
            <span className="mt-0.5 rounded-full bg-muted p-1 text-muted-foreground">
              {progress >= 100 ? (
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              )}
            </span>
            <div>
              <p className="font-medium text-foreground">
                {t("step1.generatingFinalizingDashboardTitle")}
              </p>
              <p className="text-[11px] text-muted-foreground sm:text-xs">
                {t("step1.generatingFinalizingDashboardDescription")}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground sm:text-xs">
          {t("step1.generatingHelpText")}
        </p>
      </section>
    </div>
  )
}
