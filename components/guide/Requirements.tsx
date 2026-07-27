import { BrandLogo } from './brand-logos'
import type { Requirement } from './types'
import styles from './content.module.css'

/** Grid of "what you need before you start" cards, each linking out to the source. */
export function Requirements({ items }: { items: Requirement[] }) {
  return (
    <ul className={styles.requirements}>
      {items.map((item) => (
        <li key={item.name}>
          <a
            className={styles.requirement}
            href={item.href}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.requirementLogo}>
              <BrandLogo brand={item.brand} />
            </span>
            <span className={styles.requirementBody}>
              <span className={styles.requirementName}>{item.name}</span>
              <span className={styles.requirementNote}>{item.note}</span>
              <span className={styles.requirementAction}>{item.action} →</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
