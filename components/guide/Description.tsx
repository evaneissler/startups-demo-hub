import type { ReactNode } from 'react'
import styles from './content.module.css'

/**
 * Prose block inside a step. Children are normal MDX/markdown content and keep
 * Nextra's native typography — this is just a semantic wrapper for authoring.
 */
export function Description({ children }: { children?: ReactNode }) {
  return <div className={styles.description}>{children}</div>
}
