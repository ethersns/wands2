import Link from "next/link"

import { ListingCard } from "@/components/listing-card"
import { sellers, type Listing } from "@/lib/data"

const sellerById = Object.fromEntries(sellers.map((seller) => [seller.id, seller]))

export function ListingGrid({
  listings,
  clearHref = "/browse",
  emptyMessage = "No listings match these filters. Try widening your search.",
}: {
  listings: Listing[]
  clearHref?: string
  emptyMessage?: string
}) {
  if (listings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-gold)]/40 px-6 py-16 text-center">
        <p className="font-heading text-2xl text-[var(--color-cream)]">Nothing here yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--color-lavender)]">
          {emptyMessage}
        </p>
        <Link
          href={clearHref}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-indigo)] transition hover:bg-[var(--color-gold)]/90"
        >
          Clear filters
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <Link
          key={listing.id}
          href={`/listing/${listing.id}`}
          className="block rounded-2xl transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)] [&>article]:h-full"
        >
          <ListingCard
            listing={listing}
            sellerName={sellerById[listing.sellerId]?.name ?? "Mystic Seller"}
          />
        </Link>
      ))}
    </div>
  )
}
