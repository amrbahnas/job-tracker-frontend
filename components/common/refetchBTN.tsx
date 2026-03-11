import { useRefetch } from "@/api_config/useRefetch"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { RefreshCcw } from "lucide-react"

const RefetchBTN = ({
  queryKey,
  className,
}: {
  queryKey: string | string[]
  className?: string
}) => {
  const { loading, refetch } = useRefetch(queryKey)
  return (
    <Button
      size="icon-lg"
      variant="outline"
      disabled={loading}
      onClick={refetch}
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
