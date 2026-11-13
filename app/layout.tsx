import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const siteUrl = "https://wands.trade"
const siteDescription =
  "A twilight marketplace for handmade, vintage and pre-loved magical goods — wands, crystals, tarot decks, candles and ritual tools from verified makers and collectors."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "wands.trade | Where magic changes hands",
  description: siteDescription,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "wands.trade",
    title: "wands.trade | Where magic changes hands",
    description: siteDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "A wand catching gold light against a twilight sky — wands.trade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "wands.trade | Where magic changes hands",
    description: siteDescription,
    images: ["/og.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#1E1B3A",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} bg-background`}>
      <body className="bg-background font-body text-foreground antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
