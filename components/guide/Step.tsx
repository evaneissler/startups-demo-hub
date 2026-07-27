'use client'

import { useMDXComponents } from 'nextra-theme-docs'
import { useGuide } from './guide-context'
import type { StepProps } from './types'
import { STEP_MARKER } from './utils'
import styles from './content.module.css'

export function Step({ id, title, children }: StepProps) {
  const guide = useGuide()
  /* Nextra's own h2, so step titles get the docs heading treatment and the
   * hover permalink. Its `id` is what the sidebar's step links point at. */
  const { h2: Heading } = useMDXComponents()

  if (guide?.mode === 'demo' && guide.currentStepId !== id) {
    return null
  }

  return (
    <section data-step-id={id} className={styles.step}>
      <Heading id={id} className={styles.stepTitle}>
        {title}
      </Heading>
      {children}
    </section>
  )
}

;(Step as unknown as Record<string, boolean>)[STEP_MARKER] = true
