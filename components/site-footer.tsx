import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-gold)]/30 bg-[var(--color-indigo)] py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <p className="font-heading text-xl text-[var(--color-cream)]">wands.trade</p>
        <p className="max-w-xl text-sm text-[var(--color-lavender)]">
          A twilight marketplace for handmade, vintage, and pre-loved magical goods.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-[var(--color-cream)]">
          <Link href="/browse" className="hover:text-[var(--color-gold)]">
            Browse
          </Link>
          <Link href="/swaps" className="hover:text-[var(--color-gold)]">
            Swaps
          </Link>
          <Link href="#waitlist" className="hover:text-[var(--color-gold)]">
            Join waitlist
          </Link>
        </div>
      </div>
    </footer>
  )
}
