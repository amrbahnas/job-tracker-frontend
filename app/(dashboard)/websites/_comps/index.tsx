"use client"

import { useState } from "react"
import Header from "./header"
import WebsiteFormDialog from "./websiteFormDialog"
import { WebsitesList } from "./websitesList"
import { useGetWebsites } from "../_api/queries"

function WebsitesView() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null)
  const { data: websites, isPending, isError, refetch } = useGetWebsites()

  const handleAddWebsite = () => {
    setEditingWebsite(null)
    setIsFormOpen(true)
  }

  const handleEditWebsite = (website: Website) => {
    setEditingWebsite(website)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setEditingWebsite(null)
    setIsFormOpen(false)
  }

  return (
    <main
      className="flex flex-col gap-6"
      aria-labelledby="websites-dashboard-heading"
    >
      <section className="flex flex-col gap-2">
        <Header onAddClick={handleAddWebsite} />
      </section>

      <WebsitesList
        onAddWebsite={handleAddWebsite}
        onEditWebsite={handleEditWebsite}
        websites={websites || []}
        isPending={isPending}
        isError={isError}
        refetch={refetch}
      />

      <WebsiteFormDialog
        editingWebsite={editingWebsite}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSuccess={refetch}
      />
    </main>
  )
}

export default WebsitesView
