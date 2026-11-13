"use client"

import Link from "next/link"
import { useId, useRef } from "react"
import { Sparkles, X } from "lucide-react"

const variantClasses = {
  primary:
    "bg-[var(--color-gold)] text-[var(--color-indigo)] hover:bg-[var(--color-gold)]/90",
  secondary:
    "border border-[var(--color-gold)]/50 text-[var(--color-cream)] hover:bg-[var(--color-plum)]/50",
}

export function ComingSoonButton({
  label,
  variant = "primary",
}: {
  label: string
  variant?: "primary" | "secondary"
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={`inline-flex flex-1 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${variantClasses[variant]}`}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-[var(--color-gold)]/40 bg-[var(--color-indigo)] p-0 text-[var(--color-cream)] backdrop:bg-[var(--color-indigo)]/80"
      >
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-[var(--color-gold)]">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">Coming soon</span>
            </span>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close dialog"
              className="rounded-full border border-[var(--color-gold)]/40 p-1.5 text-[var(--color-cream)] transition hover:bg-[var(--color-plum)]/50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <h2 id={titleId} className="font-heading text-2xl text-[var(--color-cream)]">
            {label} opens with the next release
          </h2>
          <p className="text-sm leading-6 text-[var(--color-lavender)]">
            Checkout and swap proposals are not live yet. Join the waitlist and we will email you the
            moment they open.
          </p>

          <Link
            href="/#waitlist"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-indigo)] transition hover:bg-[var(--color-gold)]/90"
          >
            Join the waitlist
          </Link>
        </div>
      </dialog>
    </>
  )
}
