import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({
  className,
  ...props
}) {
  return (
    <div className="bg-transparent flex items-center justify-center min-h-screen">
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className={cn("size-8 animate-spin text-blue-500", className)}
        {...props} />
    </div>
  );
}

export { Spinner }
