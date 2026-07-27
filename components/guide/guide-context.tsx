'use client'

import { createContext, useContext } from 'react'
import type { GuideContextValue } from './types'

export const GuideContext = createContext<GuideContextValue | null>(null)

/**
 * Access the surrounding <Guide> state. Safe to call from any block/step
 * component; returns `null` when rendered outside a <Guide> (e.g. a stray
 * block in plain MDX) so components can degrade gracefully.
 */
export function useGuide(): GuideContextValue | null {
  return useContext(GuideContext)
}

/** Like `useGuide` but throws — use inside components that require a Guide. */
export function useGuideStrict(): GuideContextValue {
  const ctx = useContext(GuideContext)
  if (!ctx) {
    throw new Error('This component must be rendered inside a <Guide>.')
  }
  return ctx
}
