'use client'

import Link from 'next/link'
import type { DemoMeta } from './types'
import styles from './guide.module.css'

interface WatchDemoLinkProps {
  meta: DemoMeta
}

/** Shown at the top of a build guide when a demo recording exists. */
export function WatchDemoLink({ meta }: WatchDemoLinkProps) {
  if (!meta.recording?.src || !meta.slug) return null

  return (
    <Link href={`/demo/${meta.slug}`} className={styles.demoLink}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
      Watch demo
    </Link>
  )
}
