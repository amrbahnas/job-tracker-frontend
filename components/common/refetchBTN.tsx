import { useRefetch } from "@/api_config/useRefetch"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { RefreshCcw } from "lucide-react"
import { useState } from "react"

const RefetchBTN = ({
  queryKey,
  className,
}: {
  queryKey: string | string[]
  className?: string
}) => {
  const [loading, setLoading] = useState(false)
  const { refetch } = useRefetch(queryKey)

  return (
    <Button
      size="icon-lg"
      variant="outline"
      disabled={loading}
      onClick={() => {
        setLoading(true)
        refetch().then(() => {
          setLoading(false)
        })
      }}
      className={className}
    >
      {loading ? (
        <Spinner className="size-4" />
      ) : (
        <RefreshCcw className="size-4" />
      )}
    </Button>
  )
}

export default RefetchBTN
