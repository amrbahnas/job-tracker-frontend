"use client"

import { Button } from "@/components/ui/button"
import { Form, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Code, Info } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { toast } from "sonner"
import { useWebsitesActions } from "../_api/mutations"
import { AutofillWithAiDialog } from "./autofillWithAiDialog"
import IntervalSelector from "./intervalSelector"
import { WebsiteUrlsEditor } from "./websiteUrlsEditor"
import { useTranslations } from "next-intl"

function createWebsiteFormSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, t("validationNameRequired")),
    urls: z
      .array(z.string())
      .refine(
        (arr) => arr.some((u) => u.trim().length > 0),
        t("validationUrlsRequired")
      )
      .refine(
        (arr) => {
          const normalize = (u: string) =>
            u.trim().toLowerCase().replace(/\/+$/, "") || ""
          const nonEmpty = arr.map(normalize).filter((u) => u !== "")
          return new Set(nonEmpty).size === nonEmpty.length
        },
        t("validationUrlsNoDuplicates")
      ),
    scrapeIntervalMinutes: z
      .number()
      .min(1, t("validationIntervalMin"))
      .max(10080, t("validationIntervalMax")),
    enabled: z.boolean(),
    selectors: z.object({
      jobCard: z.string().min(1, t("validationJobCardRequired")),
      title: z.string().min(1, t("validationJobTitleRequired")),
      company: z.string().optional(),
      link: z.string().min(1, t("validationJobLinkRequired")),
      location: z.string().optional(),
      salary: z.string().optional(),
      date: z.string().optional(),
      description: z.string().optional(),
    }),
  })
}

export type WebsiteFormValues = z.infer<
  ReturnType<typeof createWebsiteFormSchema>
>

type WebsiteFormProps = {
  website?: Website | null
  onCancel?: () => void
}

export function WebsiteForm({ website, onCancel }: WebsiteFormProps) {
  const isEditing = Boolean(website?._id)
  const t = useTranslations("websites.form")
  const websiteFormSchema = useMemo(
    () => createWebsiteFormSchema(t as (key: string) => string),
    [t]
  )

  const form = useForm<WebsiteFormValues>({
    resolver: zodResolver(websiteFormSchema as any),
    defaultValues: {
      name: website?.name ?? "",
      urls:
        Array.isArray(website?.urls) && website.urls.length > 0
          ? website.urls
          : [""],
      scrapeIntervalMinutes: website?.scrapeIntervalMinutes ?? 60,
      enabled: website?.enabled ?? true,
      selectors: {
        jobCard: website?.selectors?.jobCard ?? "",
        title: website?.selectors?.title ?? "",
        company: website?.selectors?.company ?? "",
        link: website?.selectors?.link ?? "",
        location: website?.selectors?.location ?? "",
        salary: website?.selectors?.salary ?? "",
        date: website?.selectors?.date ?? "",
        description: website?.selectors?.description ?? "",
      },
    },
  })

  const {
    control,
    formState: { isSubmitting, errors },
    setValue,
    watch,
    reset,
    setError,
  } = form

  const { create, createLoading, update, updateLoading } = useWebsitesActions(
    website?._id
  )

  useEffect(() => {
    if (website) {
      reset({
        name: website.name,
        urls:
          Array.isArray(website.urls) && website.urls.length > 0
            ? website.urls
            : [""],
        scrapeIntervalMinutes: website.scrapeIntervalMinutes ?? 60,
        enabled: website.enabled,
        selectors: {
          jobCard: website.selectors?.jobCard ?? "",
          title: website.selectors?.title ?? "",
          company: website.selectors?.company ?? "",
          link: website.selectors?.link ?? "",
          location: website.selectors?.location ?? "",
          salary: website.selectors?.salary ?? "",
          date: website.selectors?.date ?? "",
          description: website.selectors?.description ?? "",
        },
      })
    }
  }, [website, reset])

  const submitting = isSubmitting || createLoading || updateLoading

  const onSubmit = useCallback(
    (values: WebsiteFormValues) => {
      const urls = (values.urls || []).map((u) => u.trim()).filter(Boolean)

      const payload = {
        name: values.name.trim(),
        urls,
        selectors: {
          jobCard: values.selectors.jobCard.trim(),
          title: values.selectors.title.trim(),
          company: values.selectors.company?.trim() || undefined,
          link: values.selectors.link.trim(),
          location: values.selectors.location?.trim() || undefined,
          salary: values.selectors.salary?.trim() || undefined,
          date: values.selectors.date?.trim() || undefined,
          description: values.selectors.description?.trim() || undefined,
        },
        enabled: values.enabled,
        scrapeIntervalMinutes: values.scrapeIntervalMinutes || 60,
      }

      const mutation = isEditing ? update : create

      mutation(payload, {
        onSuccess: () => {
          toast.success(
            isEditing ? t("toastUpdated") : t("toastCreated")
          )
          onCancel?.()
        },
      })
    },
    [create, createLoading, update, updateLoading, isEditing, website?._id]
  )

  const selectedInterval = watch("scrapeIntervalMinutes") ?? 60
  const [selectorsOpen, setSelectorsOpen] = useState(false)
  const hasSelectorErrors = Boolean(errors.selectors)

  useEffect(() => {
    if (hasSelectorErrors) setSelectorsOpen(true)
  }, [hasSelectorErrors])

  const handleSelectorsExtracted = useCallback(
    (selectors: {
      jobCard?: string
      title?: string
      company?: string
      location?: string
      link?: string
      description?: string
      salary?: string
      date?: string
    }) => {
      setValue("selectors.jobCard", selectors.jobCard ?? "", {
        shouldDirty: true,
      })
      setValue("selectors.title", selectors.title ?? "", { shouldDirty: true })
      setValue("selectors.company", selectors.company ?? "", {
        shouldDirty: true,
      })
      setValue("selectors.location", selectors.location ?? "", {
        shouldDirty: true,
      })
      setValue("selectors.link", selectors.link ?? "", { shouldDirty: true })
      setValue("selectors.description", selectors.description ?? "", {
        shouldDirty: true,
      })
      setValue("selectors.salary", selectors.salary ?? "", {
        shouldDirty: true,
      })
      setValue("selectors.date", selectors.date ?? "", { shouldDirty: true })
    },
    [setValue]
  )

  return (
    <Form<WebsiteFormValues>
      form={form}
      onSubmit={onSubmit}
      className="space-y-8"
    >
      <div className="space-y-4 rounded-lg border bg-card p-4 md:grid-cols-[2fr,1fr] dark:bg-muted/20">
        <h3 className="flex items-center gap-2 text-base font-semibold text-primary dark:text-primary-foreground">
          <Info className="size-4" />
          {t("sectionBasicInfo")}
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <FormItem name="name">
            <Input
              label={t("platformNameLabel")}
              placeholder={t("platformNamePlaceholder")}
            />
          </FormItem>
          <div className="space-y-2">
            <label className="text-md mb-3 block font-medium tracking-[-0.32px] text-gray-700 first-letter:uppercase dark:text-gray-300">
              {t("scrapeIntervalLabel")}
            </label>
            <IntervalSelector
              value={selectedInterval}
              onChange={(value) =>
                setValue("scrapeIntervalMinutes", value, { shouldDirty: true })
              }
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-md mb-3 block font-medium tracking-[-0.32px] text-gray-700 first-letter:uppercase dark:text-gray-300">
            {t("targetUrlsLabel")}
          </label>
          <WebsiteUrlsEditor
            urls={watch("urls") ?? [""]}
            onChange={(next) => {
              setValue("urls", next, {
                shouldDirty: true,
              })
              setError("urls", {
                type: "manual",
                message: undefined,
              })
            }}
            errorMessage={
              typeof (errors.urls as any)?.message === "string"
                ? (errors.urls as any).message
                : undefined
            }
          />
        </div>
        <div className="flex items-center justify-between gap-4 rounded-lg border border-input/50 bg-background p-4">
          <div className="space-y-0.5">
            <label className="text-md font-medium tracking-[-0.32px] text-gray-700 first-letter:uppercase dark:text-gray-300">
              {t("activeStatusLabel")}
            </label>
            <p className="text-sm text-muted-foreground">
              {t("activeStatusDescription")}
            </p>
          </div>
          <Controller
            name="enabled"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                size="default"
              />
            )}
          />
        </div>
      </div>
      <div className="mb-0 w-full space-y-4 rounded-lg border bg-card p-4 dark:bg-muted/20">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 text-base font-semibold text-primary dark:text-primary-foreground">
            <Code className="size-4" />
            {t("sectionSelectors")}
          </h3>

          <AutofillWithAiDialog
            onSelectorsExtracted={handleSelectorsExtracted}
          />
        </div>
        <Collapsible open={selectorsOpen} onOpenChange={setSelectorsOpen}>
          <p className="text-sm text-muted-foreground">
            {t("selectorsHelper")}
          </p>
          <CollapsibleContent className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormItem name="selectors.jobCard">
                <Input
                  label={t("jobCardLabel")}
                  placeholder={t("jobCardPlaceholder")}
                />
              </FormItem>
              <FormItem name="selectors.link">
                <Input
                  label={t("jobLinkLabel")}
                  placeholder={t("jobLinkPlaceholder")}
                />
              </FormItem>
              <FormItem name="selectors.title">
                <Input
                  label={t("jobTitleLabel")}
                  placeholder={t("jobTitlePlaceholder")}
                />
              </FormItem>
              <FormItem name="selectors.company">
                <Input
                  label={t("companyNameLabel")}
                  placeholder={t("companyNamePlaceholder")}
                />
              </FormItem>

              <FormItem name="selectors.location">
                <Input
                  label={t("locationLabel")}
                  placeholder={t("locationPlaceholder")}
                />
              </FormItem>

              <FormItem name="selectors.salary">
                <Input
                  label={t("salaryLabel")}
                  placeholder={t("salaryPlaceholder")}
                />
              </FormItem>

              <FormItem name="selectors.date">
                <Input
                  label={t("dateLabel")}
                  placeholder={t("datePlaceholder")}
                />
              </FormItem>
              <FormItem name="selectors.description">
                <Input
                  label={t("descriptionLabel")}
                  placeholder={t("descriptionPlaceholder")}
                />
              </FormItem>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="sticky bottom-0 flex items-center justify-end gap-2 bg-background py-6">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={submitting}
          >
            {t("cancel")}
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={submitting}
          loading={submitting}
        >
          {isEditing ? t("saveChanges") : t("savePlatform")}
        </Button>
      </div>
    </Form>
  )
}

export default WebsiteForm
