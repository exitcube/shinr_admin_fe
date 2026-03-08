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

interface PageLoadingOverlayProps {
  label?: string
}

export function PageLoadingOverlay({ label = "Please wait..." }: PageLoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-[999] bg-white/60 backdrop-blur-[1px] flex items-center justify-center pointer-events-auto">
      <div className="flex flex-col items-center gap-3 text-[#101010]">
        <Spinner className="size-10" />
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  )
}
