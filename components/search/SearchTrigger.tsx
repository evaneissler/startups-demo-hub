'use client'

import { useEffect, useState } from 'react'
import { setSearchOpen } from './search-store'
import styles from './search.module.css'

/** Navbar affordance that opens the search dialog. */
export function SearchTrigger() {
  const [isApple, setIsApple] = useState(false)

  useEffect(() => {
    setIsApple(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
  }, [])

  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={() => setSearchOpen(true)}
    >
      <SearchIcon />
      <span className={styles.triggerLabel}>Search demos…</span>
      <kbd className={styles.kbd}>{isApple ? '⌘' : 'Ctrl '}K</kbd>
    </button>
  )
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}
