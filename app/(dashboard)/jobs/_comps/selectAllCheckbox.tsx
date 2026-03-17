import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations } from "next-intl"

const SelectAllCheckbox = ({
  selectedJobs,
  jobs,
  setSelectedIds,
}: {
  selectedJobs: string[]
  jobs: Job[]
  setSelectedIds: (ids: Set<string>) => void
}) => {
  const t = useTranslations("common")
  return (
    <div className="flex items-center gap-2">
      {selectedJobs.length > 0 && selectedJobs.length < jobs.length ? (
        <button
          onClick={() => setSelectedIds(new Set(jobs.map((job) => job._id)))}
          className="flex size-5 cursor-pointer items-center justify-center rounded-sm border border-primary p-[3px]"
        >
          <span className="h-[2px] w-full rounded-full bg-primary" />
        </button>
      ) : (
        <Checkbox
          id="select-all"
          checked={selectedJobs.length === jobs.length}
          onCheckedChange={(checked) =>
            setSelectedIds(new Set(checked ? jobs.map((job) => job._id) : []))
          }
        />
      )}

      <label htmlFor="select-all">{t("selectAll")}</label>
      <span className="text-xs text-muted-foreground">
        ({selectedJobs.length}/{jobs.length})
      </span>
    </div>
  )
}

export default SelectAllCheckbox
