'use client'

import {
  Children,
  useCallback,
  useMemo,
  useState,
  type ReactNode
} from 'react'
import { GuideContext } from './guide-context'
import { WatchDemoLink } from './WatchDemoLink'
import type { DemoMeta, GuideMode } from './types'
import { extractSteps, isStepElement } from './utils'
import styles from './guide.module.css'

interface GuideProps {
  meta: DemoMeta
  /** `full` (default) shows every step in the docs view. */
  mode?: GuideMode
  currentStepId?: string
  onStepChange?: (id: string) => void
  children?: ReactNode
}

/** Docs-style full guide view with optional "Watch demo" link. */
export function Guide({
  meta,
  mode = 'full',
  currentStepId: controlledStepId,
  onStepChange,
  children
}: GuideProps) {
  const steps = useMemo(
    () => meta.steps ?? extractSteps(children),
    [meta.steps, children]
  )

  const [uncontrolledStepId, setUncontrolledStepId] = useState<string | null>(
    () => steps[0]?.id ?? null
  )
  const currentStepId = controlledStepId ?? uncontrolledStepId

  const setCurrentStepId = useCallback(
    (id: string) => {
      setUncontrolledStepId(id)
      onStepChange?.(id)
    },
    [onStepChange]
  )

  const move = useCallback(
    (delta: number) => {
      const index = steps.findIndex((s) => s.id === currentStepId)
      const nextIndex = Math.min(Math.max(index + delta, 0), steps.length - 1)
      const next = steps[nextIndex]
      if (next) setCurrentStepId(next.id)
    },
    [steps, currentStepId, setCurrentStepId]
  )

  const value = useMemo(
    () => ({
      meta,
      steps,
      currentStepId,
      setCurrentStepId,
      goNext: () => move(1),
      goPrev: () => move(-1),
      mode,
      seek: () => {},
      hasTap: () => false,
      autoScroll: false,
      toggleAutoScroll: () => {}
    }),
    [meta, steps, currentStepId, setCurrentStepId, move, mode]
  )

  const visibleChildren =
    mode === 'live'
      ? Children.toArray(children).filter(
          (child) => isStepElement(child) && child.props.id === currentStepId
        )
      : children

  return (
    <GuideContext.Provider value={value}>
      {mode === 'live' ? (
        visibleChildren
      ) : (
        <>
          <header className={styles.header}>
            <h1 className={styles.title}>{meta.title}</h1>
            {(meta.date || meta.tags?.length) && (
              <div className={styles.meta}>
                {meta.date && <time>{meta.date}</time>}
                {meta.tags?.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {meta.summary && <p className={styles.summary}>{meta.summary}</p>}

            <div className={styles.actions}>
              <WatchDemoLink meta={meta} />
              <span className={styles.duration}>
                {steps.length} steps
                {meta.recording?.duration
                  ? ` · ${Math.round(meta.recording.duration / 60)} min demo`
                  : ''}
              </span>
            </div>

            {/* The step list lives in the sidebar TOC, so the header carries a
              * summary instead. See app/[[...mdxPath]]/page.jsx. */}
            {meta.highlights?.length ? (
              <section className={styles.summaryCard} aria-label="At a glance">
                <span className={styles.summaryLabel}>At a glance</span>
                <dl className={styles.summaryList}>
                  {meta.highlights.map((highlight) => (
                    <div key={highlight.label} className={styles.summaryRow}>
                      <dt className={styles.summaryTerm}>{highlight.label}</dt>
                      <dd className={styles.summaryValue}>{highlight.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}
          </header>
          {children}
        </>
      )}
    </GuideContext.Provider>
  )
}
