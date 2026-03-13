import React from "react"
import { cn } from "@/lib/utils"

const Container = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...rest}
      className={cn("mx-auto h-full w-full max-w-7xl px-6 sm:px-0", className)}
    >
      {children}
    </div>
  )
}

export default Container
