import React from "react"
import { Icon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: Icon
  children?: React.ReactNode
}

export const MdxTerminal = ({
  children,
  className,
  ...props
}: TerminalProps) => {
  return (
    <div
      className={cn(
        "group relative rounded-lg border shadow-md transition-shadow hover:shadow-lg my-6"
      )}
    >
      <div
        className={cn("text-sm flex flex-col justify-between text-foreground")}
      >
        <div
          className={cn("flex gap-x-2 items-center text-sm border-b px-4 py-3")}
        >
          <Icons.terminal className={cn("h-4 w-4")} />
          <p>Terminal</p>
        </div>
        <div className={cn(className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  )
}
