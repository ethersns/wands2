"use client"

import Link from "next/link"
import { Menu, MoonStar, Search, Sparkles, X } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { href: "/browse", label: "Browse" },
  { href: "/swaps", label: "Swaps" },
  { href: "#waitlist", label: "Join waitlist" },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-gold)]/30 bg-[var(--color-indigo)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-cream)]">
          <MoonStar className="h-5 w-5 text-[var(--color-gold)]" />
          <span className="font-heading text-2xl font-semibold tracking-wide">wands.trade</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-lavender)] transition hover:text-[var(--color-cream)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-plum)]/50 px-3 py-1.5 md:flex">
          <Search className="mr-2 h-4 w-4 text-[var(--color-lavender)]" />
          <input
            aria-label="Search listings"
            placeholder="Search spells, tools, sellers..."
            className="w-52 bg-transparent text-sm text-[var(--color-cream)] placeholder:text-[var(--color-lavender)]/70 outline-none"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-full border border-[var(--color-gold)]/40 p-2 text-[var(--color-cream)] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[var(--color-gold)]/30 bg-[var(--color-indigo)] px-4 py-4 md:hidden">
          <div className="mb-4 flex items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-plum)]/50 px-3 py-2">
            <Search className="mr-2 h-4 w-4 text-[var(--color-lavender)]" />
            <input
              aria-label="Mobile search listings"
              placeholder="Search"
              className="w-full bg-transparent text-sm text-[var(--color-cream)] placeholder:text-[var(--color-lavender)]/70 outline-none"
            />
          </div>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-[var(--color-lavender)] transition hover:bg-[var(--color-plum)]/40 hover:text-[var(--color-cream)]"
                onClick={() => setIsOpen(false)}
              >
                <Sparkles className="h-4 w-4 text-[var(--color-gold)]" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
