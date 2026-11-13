"use client"

import { useRef } from "react"
import { SlidersHorizontal, X } from "lucide-react"

export function FilterSheet({
  children,
  activeCount,
}: {
  children: React.ReactNode
  activeCount: number
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/45 px-4 py-2 text-sm font-medium text-[var(--color-cream)] transition hover:bg-[var(--color-plum)]/50 lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4 text-[var(--color-gold)]" />
        Filters
        {activeCount > 0 && (
          <span className="rounded-full bg-[var(--color-gold)] px-1.5 text-xs font-semibold text-[var(--color-indigo)]">
            {activeCount}
          </span>
        )}
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Filters"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
        className="m-0 h-dvh max-h-dvh w-[86%] max-w-sm border-0 bg-transparent p-0 backdrop:bg-[var(--color-indigo)]/80"
      >
        <div
          className="flex h-full flex-col gap-6 overflow-y-auto bg-[var(--color-indigo)] p-6 text-[var(--color-cream)]"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) dialogRef.current?.close()
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-heading text-2xl">Filters</h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close filters"
              className="rounded-full border border-[var(--color-gold)]/40 p-2 text-[var(--color-cream)] transition hover:bg-[var(--color-plum)]/50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  )
}
