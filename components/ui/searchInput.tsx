import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "./input"
const SearchInput = ({
  placeholder,
  value,
  onChange = () => {},
  disabled,
  inputClassName,
  className,
}: {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  inputClassName?: string
  className?: string
}) => {
  const [searchValue, setSearchValue] = useState(value ?? "")

  // useEffect(() => {
  //   if (value !== undefined) setSearchValue(value)
  // }, [value])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange?.(searchValue ?? "")
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchValue])

  return (
    <Input
      type="search"
      placeholder={placeholder ?? "Search"}
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value)
      }}
      iconStart={<SearchIcon className="text-neutral-gray-500 size-4" />}
      className={cn(
        "h-full flex-1 focus-visible:shadow-none! focus-visible:ring-0",
        className
      )}
      inputClassName={cn("h-full flex-1", inputClassName)}
      disabled={disabled}
    />
  )
}

export default SearchInput
