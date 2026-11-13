import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, ShieldCheck, Star } from "lucide-react"

import { ListingCard } from "@/components/listing-card"
import { listings, sellers } from "@/lib/data"

export function generateStaticParams() {
  return sellers.map((seller) => ({ id: seller.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const seller = sellers.find((entry) => entry.id === id)

  if (!seller) return { title: "Seller not found — wands.trade" }

  return {
    title: `${seller.name} — wands.trade`,
    description: seller.bio,
  }
}

export default async function SellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const seller = sellers.find((entry) => entry.id === id)

  if (!seller) notFound()

  const sellerListings = listings.filter((listing) => listing.sellerId === seller.id)
  const swapCount = sellerListings.filter(
    (listing) => listing.type === "swap" || listing.type === "both",
  ).length

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

        <header className="mt-8 flex flex-col gap-6 border-b border-[var(--color-gold)]/25 pb-10 sm:flex-row sm:items-start sm:gap-8">
          <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-gold)]/50 sm:h-28 sm:w-28">
            <Image
              src={seller.avatar}
              alt={seller.name}
              fill
              priority
              sizes="112px"
              className="object-cover"
            />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-4xl text-[var(--color-cream)] text-balance sm:text-5xl">
                {seller.name}
              </h1>
              {seller.verifiedMaker && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-gold)]/15 px-3 py-1 text-xs font-medium text-[var(--color-gold)]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Maker
                </span>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[var(--color-lavender)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[var(--color-gold)]" />
                {seller.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 text-[var(--color-gold)]" />
                {seller.rating.toFixed(1)} rating
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-lavender)]">
              {seller.bio}
            </p>
          </div>
        </header>

        <section className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-heading text-2xl text-[var(--color-cream)] sm:text-3xl">
              {sellerListings.length} {sellerListings.length === 1 ? "listing" : "listings"}
            </h2>
            {swapCount > 0 && (
              <p className="text-sm text-[var(--color-lavender)]">{swapCount} open to swaps</p>
            )}
          </div>

          {sellerListings.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {sellerListings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listing/${listing.id}`}
                  className="block rounded-2xl transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)] [&>article]:h-full"
                >
                  <ListingCard listing={listing} sellerName={seller.name} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-[var(--color-gold)]/40 px-6 py-12 text-center text-sm leading-6 text-[var(--color-lavender)]">
              {seller.name} has not listed anything yet. Check back after the next new moon.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
