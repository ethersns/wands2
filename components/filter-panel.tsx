import Link from "next/link"

import {
  conditionOptions,
  hrefFor,
  sortOptions,
  typeOptions,
  type BrowseFilters,
} from "@/lib/browse"
import { categories } from "@/lib/data"

function FilterLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`rounded-lg px-3 py-2 text-sm transition ${
        active
          ? "bg-[var(--color-gold)] font-semibold text-[var(--color-indigo)]"
          : "text-[var(--color-lavender)] hover:bg-[var(--color-plum)]/50 hover:text-[var(--color-cream)]"
      }`}
    >
      {children}
    </Link>
  )
}

function FilterGroup({
  title,
  basePath,
  filters,
  paramKey,
  options,
}: {
  title: string
  basePath: string
  filters: BrowseFilters
  paramKey: "category" | "condition" | "type"
  options: { value: string; label: string }[]
}) {
  const active = filters[paramKey]

  return (
    <fieldset className="border-0 p-0">
      <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
        {title}
      </legend>
      <div className="mt-3 flex flex-col gap-1">
        <FilterLink href={hrefFor(basePath, filters, paramKey, undefined)} active={!active}>
          All
        </FilterLink>
        {options.map((option) => (
          <FilterLink
            key={option.value}
            href={hrefFor(basePath, filters, paramKey, option.value)}
            active={active === option.value}
          >
            {option.label}
          </FilterLink>
        ))}
      </div>
    </fieldset>
  )
}

export function FilterPanel({
  basePath,
  filters,
  showType = true,
}: {
  basePath: string
  filters: BrowseFilters
  showType?: boolean
}) {
  const hasActiveFilters = Boolean(filters.category || filters.condition || filters.type)

  return (
    <div className="flex flex-col gap-7">
      <FilterGroup
        title="Category"
        basePath={basePath}
        filters={filters}
        paramKey="category"
        options={categories.map((category) => ({ value: category.slug, label: category.name }))}
      />
      <FilterGroup
        title="Condition"
        basePath={basePath}
        filters={filters}
        paramKey="condition"
        options={conditionOptions}
      />
      {showType && (
        <FilterGroup
          title="Type"
          basePath={basePath}
          filters={filters}
          paramKey="type"
          options={typeOptions}
        />
      )}
      {hasActiveFilters && (
        <Link
          href={basePath}
          className="text-sm font-medium text-[var(--color-gold)] underline underline-offset-4 transition hover:text-[var(--color-cream)]"
        >
          Clear all filters
        </Link>
      )}
    </div>
  )
}

export function SortControl({ basePath, filters }: { basePath: string; filters: BrowseFilters }) {
  return (
    <nav
      aria-label="Sort listings"
      className="flex items-center gap-1 rounded-full border border-[var(--color-gold)]/35 p-1"
    >
      {sortOptions.map((option) => {
        const active = filters.sort === option.value

        return (
          <Link
            key={option.label}
            href={hrefFor(basePath, filters, "sort", option.value)}
            aria-label={option.ariaLabel}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              active
                ? "bg-[var(--color-gold)] text-[var(--color-indigo)]"
                : "text-[var(--color-lavender)] hover:text-[var(--color-cream)]"
            }`}
          >
            {option.label}
          </Link>
        )
      })}
    </nav>
  )
}
