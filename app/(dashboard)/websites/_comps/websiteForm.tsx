"use client"

import { Button } from "@/components/ui/button"
import { Form, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Code, Info } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
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

const websiteFormSchema = z.object({
  name: z.string().min(1, "Platform name is required"),
  urls: z
    .array(z.string())
    .refine(
      (arr) => arr.some((u) => u.trim().length > 0),
      "Add at least one target URL."
    ),
  scrapeIntervalMinutes: z
    .number()
    .min(1, "Interval must be at least 1 minute")
    .max(10080, "Interval cannot exceed 1 week (10080 minutes)"),
  enabled: z.boolean(),
  selectors: z.object({
    jobCard: z.string().min(1, "Job card wrapper is required"),
    title: z.string().min(1, "Job title selector is required"),
    company: z.string().optional(),
    link: z.string().min(1, "Job link selector is required"),
    location: z.string().optional(),
    salary: z.string().optional(),
    date: z.string().optional(),
    description: z.string().optional(),
  }),
})

export type WebsiteFormValues = z.infer<typeof websiteFormSchema>

type WebsiteFormProps = {
  website?: Website | null
  onCancel?: () => void
}

export function WebsiteForm({ website, onCancel }: WebsiteFormProps) {
  const isEditing = Boolean(website?._id)

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
            isEditing
              ? "Website updated successfully"
              : "Website created successfully"
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
          Basic information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <FormItem name="name">
            <Input label="Platform name" placeholder="e.g., LinkedIn, Indeed" />
          </FormItem>
          <div className="space-y-2">
            <label className="text-md mb-3 block font-medium tracking-[-0.32px] text-gray-700 first-letter:uppercase dark:text-gray-300">
              Scrape interval
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
            Target URLs
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
              Active status
            </label>
            <p className="text-sm text-muted-foreground">
              Enable or disable background scraping for this platform
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
            Data selectors
          </h3>

          <AutofillWithAiDialog
            onSelectorsExtracted={handleSelectorsExtracted}
          />
        </div>
        <Collapsible open={selectorsOpen} onOpenChange={setSelectorsOpen}>
          <p className="text-sm text-muted-foreground">
            Use AI to detect selectors from a URL,{" "}
            <CollapsibleTrigger className="cursor-pointer text-primary/70 underline dark:text-primary-foreground/70">
              or add them manually.
            </CollapsibleTrigger>
          </p>
          <CollapsibleContent className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormItem name="selectors.jobCard">
                <Input
                  label="Job card wrapper"
                  placeholder=".job-card-container"
                />
              </FormItem>
              <FormItem name="selectors.link">
                <Input label="Job link" placeholder="a.apply-btn" />
              </FormItem>
              <FormItem name="selectors.title">
                <Input label="Job title" placeholder="h3.title" />
              </FormItem>
              <FormItem name="selectors.company">
                <Input label="Company name" placeholder=".company-link" />
              </FormItem>

              <FormItem name="selectors.location">
                <Input label="Location" placeholder=".job-location" />
              </FormItem>

              <FormItem name="selectors.salary">
                <Input label="Salary range" placeholder=".salary-metadata" />
              </FormItem>

              <FormItem name="selectors.date">
                <Input label="Posting date" placeholder="time.posted-on" />
              </FormItem>
              <FormItem name="selectors.description">
                <Input label="Description summary" placeholder=".job-snippet" />
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
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={submitting}
          loading={submitting}
        >
          {isEditing ? "Save changes" : "Save platform"}
        </Button>
      </div>
    </Form>
  )
}

export default WebsiteForm
