import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-12 animate-spin", className)}
      {...props}
    />
  )
}

export function PageLoading() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  )
}
