"use client"

import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Form, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useAppStore from "@/store/useAppStore"
import { toast } from "sonner"
import { useGetProfile } from "../_api/queries"
import { useUpdateProfile, useUpdatePassword } from "../_api/mutations"

const profileSchema = (validationT: ReturnType<typeof useTranslations>) =>
  z.object({
    fullName: z
      .string()
      .max(120, validationT("fullNameMax"))
      .optional()
      .transform((v) => (v === "" ? undefined : v)),
  })

const passwordSchema = (validationT: ReturnType<typeof useTranslations>) =>
  z
    .object({
      currentPassword: z.string().min(1, validationT("currentPasswordRequired")),
      newPassword: z.string().min(8, validationT("newPasswordMin")),
      confirmPassword: z.string().min(1, validationT("confirmPasswordRequired")),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: validationT("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    })

type ProfileFormValues = z.infer<ReturnType<typeof profileSchema>>
type PasswordFormValues = z.infer<ReturnType<typeof passwordSchema>>

export default function ProfileView() {
  const t = useTranslations("profile")
  const validationT = useTranslations("profile.validation")
  const setUser = useAppStore((s) => s.setUser)
  const storeUser = useAppStore((s) => s.user)
  const queryClient = useQueryClient()

  const { data: profile, loading: profileLoading } = useGetProfile()

  const user = profile ?? storeUser

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema(validationT) as any),
    defaultValues: {
      fullName: "",
    },
  })

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema(validationT) as any),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    if (!user) return
    profileForm.reset({
      fullName: user.fullName ?? "",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only reset when user data changes
  }, [user])

  const updateProfileMutation = useUpdateProfile({
    onSuccess: (res: any) => {
      const data = res?.data ?? res
      if (data) setUser(data)
      queryClient.invalidateQueries({ queryKey: ["/profile"] })
      toast.success(t("toast.profileUpdated"))
    },
  })

  const updatePasswordMutation = useUpdatePassword({
    onSuccess: () => {
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast.success(t("toast.passwordUpdated"))
    },
  })

  const onProfileSubmit = (values: ProfileFormValues) => {
    updateProfileMutation.mutate({
      fullName: values.fullName?.trim() || undefined,
    })
  }

  const onPasswordSubmit = (values: PasswordFormValues) => {
    updatePasswordMutation.mutate({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
  }

  if (profileLoading && !user) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-300" />
        <div className="h-64 animate-pulse rounded-lg border bg-gray-300" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t("header.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("header.description")}
        </p>
      </div>

      {/* User Information */}
      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          {t("userInfo.title")}
        </h2>

        <Form<ProfileFormValues>
          form={profileForm}
          onSubmit={onProfileSubmit}
          className="mt-6 space-y-4"
        >
          <FormItem name="fullName">
            <Input
              label={t("userInfo.fullName")}
              placeholder={t("userInfo.fullNamePlaceholder")}
              inputClassName="rounded-lg"
            />
          </FormItem>
          <div>
            <label className="text-md mb-3 block font-medium tracking-[-0.32px] text-gray-700 first-letter:uppercase">
              {t("userInfo.emailAddress")}
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 size-5 text-muted-foreground" />
              <input
                type="email"
                readOnly
                value={user?.email ?? ""}
                className="h-10 w-full rounded-lg border border-input bg-muted/50 ps-10 pr-3 text-sm text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              size="sm"
              disabled={updateProfileMutation.loading}
              loading={updateProfileMutation.loading}
            >
              {t("userInfo.saveChanges")}
            </Button>
          </div>
        </Form>
      </section>

      {/* Security */}
      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          {t("security.title")}
        </h2>

        <Form<PasswordFormValues>
          form={passwordForm}
          onSubmit={onPasswordSubmit}
          className="mt-6 space-y-4"
        >
          <FormItem name="currentPassword">
            <Input
              type="password"
              label={t("security.currentPassword")}
              placeholder={t("security.currentPasswordPlaceholder")}
              inputClassName="rounded-lg"
            />
          </FormItem>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormItem name="newPassword">
              <Input
                type="password"
                label={t("security.newPassword")}
                placeholder={t("security.newPasswordPlaceholder")}
                inputClassName="rounded-lg"
              />
            </FormItem>
            <FormItem name="confirmPassword">
              <Input
                type="password"
                label={t("security.confirmPassword")}
                placeholder={t("security.confirmPasswordPlaceholder")}
                inputClassName="rounded-lg"
              />
            </FormItem>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary">
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold">
              i
            </span>
            <p className="font-normal text-foreground">
              {t("security.passwordRequirements")}
            </p>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              size="sm"
              disabled={updatePasswordMutation.loading}
              loading={updatePasswordMutation.loading}
            >
              {t("security.updatePassword")}
            </Button>
          </div>
        </Form>
      </section>
    </div>
  )
}
