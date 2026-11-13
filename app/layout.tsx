import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "wands.trade",
  description: "A twilight marketplace for handmade, vintage and pre-loved magical goods.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body
        className="bg-[var(--color-indigo)] font-body text-[var(--color-cream)] antialiased"
        style={
          {
            "--color-indigo": "#1E1B3A",
            "--color-plum": "#4A2C5E",
            "--color-cream": "#F7F2E8",
            "--color-gold": "#C9A24B",
            "--color-lavender": "#B9A9D6",
          } as React.CSSProperties
        }
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
