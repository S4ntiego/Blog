import type { Icon } from "lucide-react"

export type WebsiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    github: string
    linkedIn: string
  }
}

export type BlogConfig = {
  navbar?: NavbarItem[]
}

export type NavbarItem = {
  title: string
  href: string
}
