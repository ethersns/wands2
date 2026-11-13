import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, ShieldCheck, Star } from "lucide-react"

import { ComingSoonButton } from "@/components/coming-soon-dialog"
import { ListingCard } from "@/components/listing-card"
import { ListingGallery } from "@/components/listing-gallery"
import { categories, listings, sellers } from "@/lib/data"

const sellerById = Object.fromEntries(sellers.map((seller) => [seller.id, seller]))

export function generateStaticParams() {
  return listings.map((listing) => ({ id: listing.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = listings.find((entry) => entry.id === id)

  if (!listing) return { title: "Listing not found — wands.trade" }

  return {
    title: `${listing.title} — wands.trade`,
    description: listing.description,
  }
}

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = listings.find((entry) => entry.id === id)

  if (!listing) notFound()

  const seller = sellerById[listing.sellerId]
  const category = categories.find((entry) => entry.slug === listing.categorySlug)
  const swappable = listing.type === "swap" || listing.type === "both"
  const swapOnly = listing.type === "swap"

  const related = [
    ...listings.filter(
      (entry) => entry.id !== listing.id && entry.categorySlug === listing.categorySlug,
    ),
    ...listings.filter(
      (entry) => entry.id !== listing.id && entry.categorySlug !== listing.categorySlug,
    ),
  ].slice(0, 4)

  return (
    <div className="bg-[var(--color-indigo)] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-lavender)] transition hover:text-[var(--color-cream)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the market
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
          <ListingGallery images={listing.images} title={listing.title} />

          <div className="flex flex-col gap-6">
            <div>
              {category && (
                <Link
                  href={`/browse?category=${category.slug}`}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] transition hover:text-[var(--color-cream)]"
                >
                  {category.name}
                </Link>
              )}
              <h1 className="mt-3 font-heading text-4xl leading-tight text-[var(--color-cream)] text-balance sm:text-5xl">
                {listing.title}
              </h1>
              <p className="mt-4 font-heading text-3xl text-[var(--color-gold)]">€{listing.price}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[var(--color-gold)]/45 px-3 py-1 text-xs capitalize text-[var(--color-cream)]">
                {listing.condition}
              </span>
              {swappable && (
                <span className="rounded-full bg-[var(--color-gold)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-indigo)]">
                  {swapOnly ? "Swap only" : "Open to swaps"}
                </span>
              )}
            </div>

            <p className="text-base leading-7 text-[var(--color-lavender)]">{listing.description}</p>

            {swappable && listing.swapWants && (
              <div className="rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-plum)]/40 p-5">
                <h2 className="font-heading text-xl text-[var(--color-cream)]">
                  What the seller wants in return
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--color-lavender)]">
                  {listing.swapWants}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <ComingSoonButton
                label="Buy now"
                variant={swapOnly ? "secondary" : "primary"}
              />
              <ComingSoonButton
                label="Propose a swap"
                variant={swapOnly ? "primary" : "secondary"}
              />
            </div>

            {seller && (
              <Link
                href={`/seller/${seller.id}`}
                className="flex items-start gap-4 rounded-2xl border border-[var(--color-gold)]/35 bg-[var(--color-plum)]/30 p-5 transition hover:border-[var(--color-gold)]/70"
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--color-gold)]/40">
                  <Image src={seller.avatar} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-heading text-lg text-[var(--color-cream)]">
                      {seller.name}
                    </span>
                    {seller.verifiedMaker && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-gold)]/15 px-2 py-0.5 text-[11px] font-medium text-[var(--color-gold)]">
                        <ShieldCheck className="h-3 w-3" />
                        Verified maker
                      </span>
                    )}
                  </span>
                  <span className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[var(--color-lavender)]">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {seller.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3 text-[var(--color-gold)]" />
                      {seller.rating.toFixed(1)}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-[var(--color-lavender)]">
                    {seller.bio}
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-heading text-2xl text-[var(--color-cream)] sm:text-3xl">
            More from {category ? category.name : "the market"}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((entry) => (
              <Link
                key={entry.id}
                href={`/listing/${entry.id}`}
                className="block rounded-2xl transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)] [&>article]:h-full"
              >
                <ListingCard
                  listing={entry}
                  sellerName={sellerById[entry.sellerId]?.name ?? "Mystic Seller"}
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
