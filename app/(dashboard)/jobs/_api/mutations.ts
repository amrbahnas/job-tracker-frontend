import useMutation from "@/api_config/useMutation"

export const useJobActions = ({ id }: { id: string }) => {
  const { mutate: updateJobStatus, isPending: isUpdatingJobStatus } =
    useMutation(`/jobs/${id}/status`, {
      method: "patch",
    })
  const { mutate: deleteJob, isPending: isDeletingJob } = useMutation(
    `/jobs/${id}`,
    {
      method: "delete",
    }
  )

  return {
    updateJobStatus,
    deleteJob,
    isUpdatingJobStatus,
    isDeletingJob,
  }
}
