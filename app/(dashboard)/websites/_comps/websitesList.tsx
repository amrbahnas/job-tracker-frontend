"use client"

import { ItemList } from "@/components/common/itemList"
import { useState } from "react"
import { useGetWebsites } from "../_api/queries"
import { WebsiteCard } from "./WebsiteCard"
import WebsiteFormDialog from "./websiteFormDialog"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"

export function WebsitesList() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null)
  const t = useTranslations("websites.list")
  const {
    data: websites,
    isPending,
    isError,
    refetch,
    pagination,
  } = useGetWebsites()

  return (
    <>
      <ItemList
        data={websites.length > 0 ? [...websites, { _id: "add-website" }] : []}
        pagination={pagination}
        isLoading={isPending}
        error={isError ? new Error(t("error")) : null}
        refetch={refetch}
        itemContent={(_, website) =>
          website._id === "add-website" ? (
            <button
              type="button"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-background text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/40"
              onClick={() => {
                setIsFormOpen(true)
                setEditingWebsite(null)
              }}
            >
              <Plus />
              <span>{t("addSource")}</span>
            </button>
          ) : (
            <WebsiteCard
              website={website as Website}
              onEditWebsite={() => {
                setIsFormOpen(true)
                setEditingWebsite(website)
              }}
              refetch={refetch}
            />
          )
        }
        listClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        itemClassName="h-56"
        messages={{
          error: t("error"),
          noData: t("noData"),
          noDataDescription: t("noDataDescription"),
          loading: t("loading"),
          endReached: t("endReached"),
        }}
      />
      <WebsiteFormDialog
        editingWebsite={editingWebsite}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  )
}
