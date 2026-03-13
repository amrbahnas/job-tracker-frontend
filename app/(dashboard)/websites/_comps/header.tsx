import { Button } from "@/components/ui/button"
import { useState } from "react"
import WebsiteFormDialog from "./websiteFormDialog"
import { useTranslations } from "next-intl"

const Header = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const t = useTranslations("websites.header")

  return (
    <header className="flex flex-wrap items-baseline justify-between gap-2">
      <div>
        <h1
          id="websites-dashboard-heading"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          {t("title")}
        </h1>
        <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" size="sm" onClick={() => setIsFormOpen(true)}>
          {t("addWebsite")}
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
