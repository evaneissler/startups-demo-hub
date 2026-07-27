import Link from 'next/link'
import { formatDuration } from '@/lib/demos'
import type { DemoMeta } from '@/components/guide/types'
import { VideoThumb } from './VideoThumb'
import styles from './hub.module.css'

interface DemoCardProps {
  meta: DemoMeta
  /** Hero treatment: wider thumbnail and visible summary. */
  featured?: boolean
}

export function DemoCard({ meta, featured = false }: DemoCardProps) {
  const duration = formatDuration(meta.recording?.duration)
  const stepCount = meta.steps?.length ?? 0
  const href = `/demo/${meta.slug}`

  return (
    <article className={featured ? styles.heroCard : styles.card}>
      <Link href={href} className={styles.thumbLink} aria-label={`Watch ${meta.title}`}>
        <span className={styles.thumbFrame}>
          <VideoThumb meta={meta} className={styles.thumb} />
          <span className={styles.playBadge}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {duration && <span className={styles.durationBadge}>{duration}</span>}
        </span>
      </Link>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          <Link href={href} className={styles.cardTitleLink}>
            {meta.title}
          </Link>
        </h3>

        {meta.summary && <p className={styles.cardSummary}>{meta.summary}</p>}

        <div className={styles.cardMeta}>
          {meta.date && <time>{meta.date}</time>}
          {stepCount > 0 && <span>{stepCount} steps</span>}
        </div>

        {meta.tags?.length ? (
          <ul className={styles.tagList}>
            {meta.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div className={styles.cardActions}>
          <Link href={href} className={styles.primaryAction}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch demo
          </Link>
          {meta.hasGuide && (
            <Link href={`/g/${meta.slug}`} className={styles.secondaryAction}>
              Read the steps
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
