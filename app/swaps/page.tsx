import { FilterPanel, SortControl } from "@/components/filter-panel"
import { FilterSheet } from "@/components/filter-sheet"
import { ListingGrid } from "@/components/listing-grid"
import { countActiveFilters, filterListings, readFilters } from "@/lib/browse"
import { listings } from "@/lib/data"

export const metadata = {
  title: "Swaps — wands.trade",
  description: "Trade treasures directly with the community through swap-friendly listings.",
}

const swapSteps = [
  {
    title: "Find a trade",
    body: "Browse the listings marked Swap and read what each seller wants in return.",
  },
  {
    title: "Propose the swap",
    body: "Offer something from your own collection and agree the details directly with the seller.",
  },
  {
    title: "Send and receive",
    body: "Post your piece once both sides confirm. No fees, no middleman, no money changing hands.",
  },
]

export default async function SwapsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const filters = readFilters(await searchParams, { allowType: false })
  const swappable = listings.filter((listing) => listing.type === "swap" || listing.type === "both")
  const results = filterListings(swappable, filters)
  const activeCount = countActiveFilters(filters)

  return (
    <div className="bg-[var(--color-indigo)] py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Trade, don&apos;t buy
        </p>
        <h1 className="mt-3 font-heading text-4xl text-[var(--color-cream)] sm:text-5xl">
          Swaps
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-lavender)]">
          Some pieces are better traded than sold. These sellers will take a piece from your collection
          instead of payment, and every listing says what they are hoping to find.
        </p>

        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {swapSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-plum)]/30 p-5"
            >
              <span className="font-heading text-2xl text-[var(--color-gold)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-2 font-heading text-lg text-[var(--color-cream)]">{step.title}</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--color-lavender)]">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:gap-10">
          <aside className="hidden lg:block lg:w-56 lg:shrink-0">
            <FilterPanel basePath="/swaps" filters={filters} showType={false} />
          </aside>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[var(--color-lavender)]">
                {results.length} {results.length === 1 ? "swap" : "swaps"} available
              </p>
              <div className="flex items-center gap-2">
                <FilterSheet activeCount={activeCount}>
                  <FilterPanel basePath="/swaps" filters={filters} showType={false} />
                </FilterSheet>
                <SortControl basePath="/swaps" filters={filters} />
              </div>
            </div>

            <div className="mt-6">
              <ListingGrid
                listings={results}
                clearHref="/swaps"
                emptyMessage="No swaps match these filters yet. Try another category or condition."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
