"use client"

import Link from "next/link"
import {
  BookOpen,
  Flame,
  Gem,
  Leaf,
  MoonStar,
  Orbit,
  Palette,
  Shirt,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react"
import { FormEvent, useMemo, useState } from "react"

import { ListingCard } from "@/components/listing-card"
import { categories, listings, sellers } from "@/lib/data"

const iconClassName = "h-5 w-5 text-[var(--color-gold)]"

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  WandSparkles,
  Gem,
  Sparkles,
  Flame,
  Leaf,
  MoonStar,
  Orbit,
  BookOpen,
  Palette,
  Shirt,
}

export default function HomePage() {
  const featuredListings = listings.slice(0, 8)
  const sellerById = useMemo(
    () => Object.fromEntries(sellers.map((seller) => [seller.id, seller])),
    [],
  )

  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"buyer" | "seller">("buyer")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail("")
  }

  return (
    <div className="font-body">
      <section className="bg-[var(--color-indigo)] py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-plum)]/40 px-4 py-1.5 text-sm text-[var(--color-lavender)]">
              <MoonStar className="h-4 w-4 text-[var(--color-gold)]" />
              Marketplace preview
            </div>
            <h1 className="font-heading text-5xl leading-tight text-[var(--color-cream)] sm:text-6xl">
              Where magic changes hands
            </h1>
            <p className="max-w-xl text-lg text-[var(--color-lavender)]">
              Discover handmade treasures, vintage finds, and pre-loved essentials from a soulful community.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/browse"
                className="rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-indigo)] transition hover:brightness-110"
              >
                Browse the market
              </Link>
              <Link
                href="#waitlist"
                className="rounded-full border border-[var(--color-gold)]/50 px-6 py-3 text-sm font-semibold text-[var(--color-cream)] transition hover:bg-[var(--color-plum)]/50"
              >
                Join the waitlist
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-[var(--color-gold)]/30 bg-[var(--color-plum)]/35 p-6">
            <p className="font-heading text-2xl text-[var(--color-cream)]">A modern mystical market</p>
            <p className="mt-3 text-sm leading-6 text-[var(--color-lavender)]">
              Built for witches, readers, herbalists, artists, and collectors sharing intentional goods.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-[var(--color-cream)]">
              <div className="rounded-2xl border border-[var(--color-gold)]/35 p-3">Handmade</div>
              <div className="rounded-2xl border border-[var(--color-gold)]/35 p-3">Vintage</div>
              <div className="rounded-2xl border border-[var(--color-gold)]/35 p-3">Pre-loved</div>
              <div className="rounded-2xl border border-[var(--color-gold)]/35 p-3">Swap-friendly</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] py-20 text-[var(--color-indigo)]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl">Browse categories</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = categoryIcons[category.icon] ?? Sparkles
              return (
                <Link
                  key={category.slug}
                  href={`/browse?category=${category.slug}`}
                  className="rounded-2xl border border-[var(--color-gold)]/60 bg-white/40 p-4 transition hover:-translate-y-0.5 hover:bg-white/65"
                >
                  <Icon className={iconClassName} />
                  <p className="mt-3 text-sm font-semibold">{category.name}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-indigo)] py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-2">
            <Star className="h-5 w-5 text-[var(--color-gold)]" />
            <h2 className="font-heading text-4xl text-[var(--color-cream)]">Featured listings</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                sellerName={sellerById[listing.sellerId]?.name ?? "Mystic Seller"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] py-20 text-[var(--color-indigo)]">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: "Buy", body: "Find magical items from trusted sellers and verified makers." },
              { title: "Sell", body: "List your handcrafted and pre-loved pieces with ease." },
              { title: "Swap", body: "Trade treasures with the community through swap-friendly listings." },
            ].map((step) => (
              <article key={step.title} className="rounded-2xl border border-[var(--color-gold)]/60 bg-white/45 p-5">
                <p className="font-heading text-2xl">{step.title}</p>
                <p className="mt-2 text-sm leading-6">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="bg-[var(--color-indigo)] py-20">
        <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-[var(--color-cream)]">Join the waitlist</h2>
          <p className="mt-3 text-[var(--color-lavender)]">
            Be first to know when wands.trade opens for buyers and sellers.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@moonmail.com"
              className="w-full rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-plum)]/40 px-5 py-3 text-[var(--color-cream)] placeholder:text-[var(--color-lavender)]/75 outline-none focus:border-[var(--color-gold)]"
              required
            />
            <div className="flex justify-center gap-2">
              {(["buyer", "seller"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRole(option)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                    role === option
                      ? "bg-[var(--color-gold)] text-[var(--color-indigo)]"
                      : "border border-[var(--color-gold)]/45 text-[var(--color-cream)]"
                  }`}
                >
                  I am a {option}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-indigo)] transition hover:brightness-110"
            >
              Join waitlist
            </button>
          </form>
          {submitted && (
            <p className="mt-4 text-sm text-[var(--color-lavender)]">
              You&apos;re on the list as a {role}. We&apos;ll send word when the market opens.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
