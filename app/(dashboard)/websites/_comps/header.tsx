import { Button } from "@/components/ui/button"
import { useState } from "react"
import WebsiteFormDialog from "./websiteFormDialog"

const Header = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-2">
      <div>
        <h1
          id="websites-dashboard-heading"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          Websites
        </h1>
        <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
          Manage your automated job board scrapers and tracking intervals.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" size="sm" onClick={() => setIsFormOpen(true)}>
          Add website
        </Button>
      </div>
      <WebsiteFormDialog
        editingWebsite={null}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </header>
  )
}

export default Header
