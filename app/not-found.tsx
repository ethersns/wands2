import Link from "next/link"
import { MoonStar } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[var(--color-indigo)] px-4 py-20">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          <MoonStar className="h-3.5 w-3.5" />
          Lost in the dark
        </span>

        <p className="mt-8 font-heading text-7xl leading-none text-[var(--color-cream)] sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-heading text-3xl text-[var(--color-cream)] text-balance sm:text-4xl">
          This path has gone dark
        </h1>
        <p className="mt-3 text-base leading-7 text-[var(--color-lavender)]">
          The page you were looking for has vanished like smoke. It may have been moved, sold, or never
          existed at all.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-indigo)] transition hover:bg-[var(--color-gold)]/90"
          >
            Back to the market
          </Link>
          <Link
            href="/browse"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-gold)]/50 px-6 py-3 text-sm font-semibold text-[var(--color-cream)] transition hover:bg-[var(--color-plum)]/50"
          >
            Browse listings
          </Link>
        </div>
      </div>
    </div>
  )
}
