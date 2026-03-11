"use client"

import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useAppStore from "@/store/useAppStore"
import { toast } from "sonner"
import { useGetProfile } from "../_api/queries"
import { useUpdateProfile, useUpdatePassword } from "../_api/mutations"

const PASSWORD_REQUIREMENTS = "Password must be at least 8 characters long."

const profileSchema = z.object({
  fullName: z
    .string()
    .max(120, "Full name must be at most 120 characters")
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type ProfileFormValues = z.infer<typeof profileSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

export default function ProfileView() {
  const setUser = useAppStore((s) => s.setUser)
  const storeUser = useAppStore((s) => s.user)
  const queryClient = useQueryClient()

  const { data: profile, loading: profileLoading } = useGetProfile()

  const user = profile ?? storeUser

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema as any),
    defaultValues: {
      fullName: "",
    },
  })

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema as any),
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
      toast.success("Profile updated successfully")
    },
  })

  const updatePasswordMutation = useUpdatePassword({
    onSuccess: () => {
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast.success("Password updated successfully")
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
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile information and security preferences.
        </p>
      </div>

      {/* User Information */}
      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          User Information
        </h2>

        <Form<ProfileFormValues>
          form={profileForm}
          onSubmit={onProfileSubmit}
          className="mt-6 space-y-4"
        >
          <FormItem name="fullName">
            <Input
              label="Full Name"
              placeholder="Your full name"
              inputClassName="rounded-lg"
            />
          </FormItem>
          <div>
            <label className="text-md mb-3 block font-medium tracking-[-0.32px] text-gray-700 first-letter:uppercase">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 size-5 text-muted-foreground" />
              <input
                type="email"
                readOnly
                value={user?.email ?? ""}
                className="h-10 w-full rounded-lg border border-input bg-muted/50 pr-3 pl-10 text-sm text-muted-foreground"
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
              Save Changes
            </Button>
          </div>
        </Form>
      </section>

      {/* Security */}
      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Security</h2>

        <Form<PasswordFormValues>
          form={passwordForm}
          onSubmit={onPasswordSubmit}
          className="mt-6 space-y-4"
        >
          <FormItem name="currentPassword">
            <Input
              type="password"
              label="Current Password"
              placeholder="Enter current password"
              inputClassName="rounded-lg"
            />
          </FormItem>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormItem name="newPassword">
              <Input
                type="password"
                label="New Password"
                placeholder="Enter new password"
                inputClassName="rounded-lg"
              />
            </FormItem>
            <FormItem name="confirmPassword">
              <Input
                type="password"
                label="Confirm New Password"
                placeholder="Confirm new password"
                inputClassName="rounded-lg"
              />
            </FormItem>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary">
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold">
              i
            </span>
            <p className="font-normal text-foreground">
              {PASSWORD_REQUIREMENTS}
            </p>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              size="sm"
              disabled={updatePasswordMutation.loading}
              loading={updatePasswordMutation.loading}
            >
              Update Password
            </Button>
          </div>
        </Form>
      </section>
    </div>
  )
}
