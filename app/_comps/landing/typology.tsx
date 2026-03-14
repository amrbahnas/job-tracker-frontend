import { cn } from "@/lib/utils"

const Typology = () => {
  return null
}

Typology.eyebrow = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-md mb-2 text-center font-semibold tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  )
}

Typology.title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2
      id="features-heading"
      className="text-gradient pb-4 text-center text-2xl leading-16 font-bold sm:text-5xl"
    >
      {children}
    </h2>
  )
}

Typology.description = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <p
      className={cn(
        "mx-auto mb-12 max-w-xl text-center text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  )
}

export default Typology
