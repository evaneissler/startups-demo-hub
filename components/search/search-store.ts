'use client'

import { useSyncExternalStore } from 'react'

/**
 * Nextra renders its search slot twice — once in the navbar, once in the mobile
 * nav — so the trigger is mounted more than once while the dialog is mounted
 * once at the root. A module-level store is what keeps them in sync.
 */
let isOpen = false
const listeners = new Set<() => void>()

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
  }
}

export function setSearchOpen(next: boolean) {
  if (isOpen === next) return
  isOpen = next
  for (const listener of listeners) listener()
}

export function toggleSearch() {
  setSearchOpen(!isOpen)
}

export function useSearchOpen() {
  return useSyncExternalStore(
    subscribe,
    () => isOpen,
    () => false
  )
}
