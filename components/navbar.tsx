"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { NavbarItem } from "types"
import { websiteConfig } from "@/config/website"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { MobileNavbar } from "./mobileNavbar"

interface NavbarProps {
  items?: NavbarItem[]
  children?: React.ReactNode
}

export function Navbar({ items, children }: NavbarProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex container gap-6 md:gap-10 w-full box-content h-12 items-center justify-between py-4">
      <div className="flex gap-6 md:gap-10">
        <Link href="/" className="items-center space-x-3 flex">
          <Icons.logo />
          <span className="font-cal text-2xl">{websiteConfig.name}</span>
        </Link>
      </div>
      <nav>
        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  item.href.startsWith(`/${segment}`)
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}
        {items && (
          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <Icons.close /> : <Icons.hamburgerMenu />}
          </button>
        )}
      </nav>
      {showMobileMenu && items && (
        <MobileNavbar items={items}>{children}</MobileNavbar>
      )}
    </div>
  )
}
