import * as React from "react"
import Link from "next/link"

import { NavbarItem } from "types"
import { cn } from "@/lib/utils"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"

interface MobileNavbarProps {
  items: NavbarItem[]
  children?: React.ReactNode
}

export function MobileNavbar({ items, children }: MobileNavbarProps) {
  useLockBodyScroll()

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-screen bg-background grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  )
}
