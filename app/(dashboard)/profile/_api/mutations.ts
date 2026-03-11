import useMutation from "@/api_config/useMutation"

type UpdateProfileSuccess = (res: any) => void
type UpdatePasswordSuccess = () => void

export const useUpdateProfile = (options?: { onSuccess?: UpdateProfileSuccess }) => {
  return useMutation("/profile", {
    method: "patch",
    onSuccess: options?.onSuccess,
  })
}

export const useUpdatePassword = (options?: {
  onSuccess?: UpdatePasswordSuccess
}) => {
  return useMutation("/profile/password", {
    method: "patch",
    onSuccess: options?.onSuccess,
  })
}
