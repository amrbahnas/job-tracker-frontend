import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import WebsiteForm from "./websiteForm"

const WebsiteFormDialog = ({
  editingWebsite,
  isOpen,
  onClose,
}: {
  editingWebsite: Website | null
  isOpen: boolean
  onClose: () => void
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar max-h-[95vh] overflow-y-auto py-0 sm:max-w-5xl">
        <DialogHeader className="z-10 bg-background py-6">
          <DialogTitle>
            {editingWebsite ? "Edit website" : "Add website"}
          </DialogTitle>
        </DialogHeader>

        <WebsiteForm website={editingWebsite} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}

export default WebsiteFormDialog
