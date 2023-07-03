import localFont from "next/font/local"

import { Analytics } from "@/components/analytics"

import "@/styles/globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/themeProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const cal = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal",
})

export const metadata: Metadata = {
  title: "Gamificent",
  description: "Personal view on gaming, as seen by Adam Ksiazek.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={cn(
          "font-inter antialiased h-full w-full bg-background box-border overflow-x-hidden",
          inter.variable,
          cal.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
