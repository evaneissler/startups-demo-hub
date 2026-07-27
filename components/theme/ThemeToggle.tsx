'use client'

import { useTheme } from 'next-themes'
import { useMounted } from 'nextra/hooks'
import { MoonIcon, SunIcon } from 'nextra/icons'
import styles from './theme.module.css'

/**
 * Light/dark switch for the navbar, in place of the theme select Nextra puts in
 * the sidebar footer. Before hydration the theme is unknown, so it renders the
 * sun the way Nextra's own switch does.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === 'dark'
  const label = `Switch to ${isDark ? 'light' : 'dark'} theme`

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <MoonIcon height="13" /> : <SunIcon height="13" />}
    </button>
  )
}
