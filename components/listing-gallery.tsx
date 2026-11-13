"use client"

import Image from "next/image"
import { useState } from "react"

export function ListingGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex] ?? images[0]

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-[var(--color-gold)]/35 bg-[var(--color-plum)]/40">
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <ul className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <li key={`${image}-${index}`}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-pressed={index === activeIndex}
                className={`block overflow-hidden rounded-xl border transition ${
                  index === activeIndex
                    ? "border-[var(--color-gold)]"
                    : "border-[var(--color-gold)]/30 hover:border-[var(--color-gold)]/70"
                }`}
              >
                <span className="relative block h-20 w-20">
                  <Image src={image} alt="" fill sizes="80px" className="object-cover" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
