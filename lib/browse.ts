import { categories, type Listing, type ListingCondition, type ListingType } from "@/lib/data"

export type BrowseFilters = {
  category?: string
  condition?: string
  type?: string
  sort?: string
}

export const conditionOptions: { value: ListingCondition; label: string }[] = [
  { value: "handmade", label: "Handmade" },
  { value: "vintage", label: "Vintage" },
  { value: "pre-loved", label: "Pre-loved" },
]

export const typeOptions: { value: ListingType; label: string }[] = [
  { value: "sale", label: "For sale" },
  { value: "swap", label: "Swap only" },
  { value: "both", label: "Sale or swap" },
]

export const sortOptions: { value?: string; label: string; ariaLabel: string }[] = [
  { value: undefined, label: "Featured", ariaLabel: "Sort by featured order" },
  { value: "price-asc", label: "Price ↑", ariaLabel: "Sort by price, low to high" },
  { value: "price-desc", label: "Price ↓", ariaLabel: "Sort by price, high to low" },
]

function readParam(searchParams: Record<string, string | string[] | undefined>, key: string) {
  const value = searchParams[key]
  return Array.isArray(value) ? value[0] : value
}

export function readFilters(
  searchParams: Record<string, string | string[] | undefined>,
  options: { allowType?: boolean } = {},
): BrowseFilters {
  const category = categories.find((entry) => entry.slug === readParam(searchParams, "category"))
  const condition = conditionOptions.find((option) => option.value === readParam(searchParams, "condition"))
  const type =
    options.allowType === false
      ? undefined
      : typeOptions.find((option) => option.value === readParam(searchParams, "type"))
  const sort = readParam(searchParams, "sort")

  return {
    category: category?.slug,
    condition: condition?.value,
    type: type?.value,
    sort: sort === "price-asc" || sort === "price-desc" ? sort : undefined,
  }
}

export function countActiveFilters(filters: BrowseFilters) {
  return [filters.category, filters.condition, filters.type].filter(Boolean).length
}

export function hrefFor(
  basePath: string,
  filters: BrowseFilters,
  key: keyof BrowseFilters,
  value?: string,
) {
  const next: BrowseFilters = { ...filters, [key]: value }
  const params = new URLSearchParams()

  for (const [param, paramValue] of Object.entries(next)) {
    if (paramValue) params.set(param, paramValue)
  }

  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

export function filterListings(listings: Listing[], filters: BrowseFilters) {
  const filtered = listings.filter((listing) => {
    if (filters.category && listing.categorySlug !== filters.category) return false
    if (filters.condition && listing.condition !== filters.condition) return false
    if (filters.type && listing.type !== filters.type) return false
    return true
  })

  if (filters.sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price)
  if (filters.sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price)
  return filtered
}
