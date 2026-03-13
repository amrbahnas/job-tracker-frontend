"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type DangerConfirmButtonProps = {
  onConfirm: () => void | Promise<void>
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  disabled?: boolean
  "aria-label"?: string
  children: React.ReactNode
  className?: string
}

export function DangerConfirmButton({
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  disabled,
  children,
  className,
  ...rest
}: DangerConfirmButtonProps &
  Omit<React.ComponentProps<typeof Button>, keyof DangerConfirmButtonProps>) {
  const [open, setOpen] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const handleConfirm = async () => {
    try {
      setIsConfirming(true)
      await onConfirm()
      setOpen(false)
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={className}
          disabled={disabled || isConfirming}
          {...rest}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            type="button"
            size="lg"
            onClick={() => setOpen(false)}
            disabled={isConfirming}
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            type="button"
            size="lg"
            onClick={handleConfirm}
            disabled={isConfirming}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
