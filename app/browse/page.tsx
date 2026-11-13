import { FilterPanel, SortControl } from "@/components/filter-panel"
import { FilterSheet } from "@/components/filter-sheet"
import { ListingGrid } from "@/components/listing-grid"
import { countActiveFilters, filterListings, readFilters } from "@/lib/browse"
import { categories, listings } from "@/lib/data"

export const metadata = {
  title: "Browse the market — wands.trade",
  description:
    "Handmade, vintage and pre-loved magical goods from verified makers and collectors across the community.",
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const filters = readFilters(await searchParams)
  const results = filterListings(listings, filters)
  const activeCount = countActiveFilters(filters)
  const activeCategory = categories.find((category) => category.slug === filters.category)

  return (
    <div className="bg-[var(--color-indigo)] py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          The market
        </p>
        <h1 className="mt-3 font-heading text-4xl text-[var(--color-cream)] sm:text-5xl">
          {activeCategory ? activeCategory.name : "All listings"}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-lavender)]">
          Handmade, vintage and pre-loved pieces from makers and collectors across the community.
        </p>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:gap-10">
          <aside className="hidden lg:block lg:w-56 lg:shrink-0">
            <FilterPanel basePath="/browse" filters={filters} />
          </aside>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[var(--color-lavender)]">
                {results.length} {results.length === 1 ? "listing" : "listings"}
              </p>
              <div className="flex items-center gap-2">
                <FilterSheet activeCount={activeCount}>
                  <FilterPanel basePath="/browse" filters={filters} />
                </FilterSheet>
                <SortControl basePath="/browse" filters={filters} />
              </div>
            </div>

            <div className="mt-6">
              <ListingGrid listings={results} clearHref="/browse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
