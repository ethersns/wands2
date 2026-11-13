import Image from "next/image"

import type { Listing } from "@/lib/data"

type ListingCardProps = {
  listing: Listing
  sellerName: string
}

export function ListingCard({ listing, sellerName }: ListingCardProps) {
  const showSwapBadge = listing.type === "swap" || listing.type === "both"

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--color-gold)]/35 bg-[var(--color-plum)]/35">
      <div className="relative aspect-square">
        <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-heading text-xl leading-tight text-[var(--color-cream)]">{listing.title}</h3>
          <p className="text-base font-semibold text-[var(--color-gold)]">€{listing.price}</p>
        </div>
        <p className="text-sm text-[var(--color-lavender)]">by {sellerName}</p>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[var(--color-gold)]/45 px-2.5 py-1 text-xs capitalize text-[var(--color-cream)]">
            {listing.condition}
          </span>
          {showSwapBadge && (
            <span className="rounded-full bg-[var(--color-gold)] px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-indigo)]">
              Swap
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
