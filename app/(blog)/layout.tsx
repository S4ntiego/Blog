import { blogConfig } from "@/config/blog"
import { Navbar } from "@/components/navbar"

interface BlogLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({ children }: BlogLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="z-40 bg-background top-0 sticky">
        <Navbar items={blogConfig.navbar} />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
