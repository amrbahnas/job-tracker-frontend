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
  onSuccess,
}: {
  editingWebsite: Website | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar max-h-[95vh] overflow-y-auto pb-0 sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            {editingWebsite ? "Edit website" : "Add website"}
          </DialogTitle>
        </DialogHeader>

        <WebsiteForm
          website={editingWebsite}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}

export default WebsiteFormDialog
