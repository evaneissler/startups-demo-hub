import { Children, isValidElement, type ReactNode } from 'react'

/**
 * Recursively flattens a React node into its plain text content.
 *
 * Guide code/command/prompt blocks are authored with a template string inside a
 * JSX expression (e.g. `<Command>{`npm i foo`}</Command>`), which keeps braces and
 * angle brackets safe from the MDX parser. This helper also tolerates the case
 * where MDX wraps inline text in a `<p>` element.
 */
export function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeToText).join('')
  if (isValidElement(node)) {
    return nodeToText((node.props as { children?: ReactNode }).children)
  }
  return ''
}

/** Marker used to identify authored <Step> elements from within <Guide>. */
export const STEP_MARKER = 'isGuideStep' as const

export interface StepElementProps {
  id: string
  title: string
}

/** Returns true if a React node is an authored <Step> element. */
export function isStepElement(
  node: ReactNode
): node is React.ReactElement<StepElementProps> {
  return (
    isValidElement(node) &&
    (node.type as { [STEP_MARKER]?: boolean })?.[STEP_MARKER] === true
  )
}

/** Extracts the ordered [{ id, title }] step list from <Guide> children. */
export function extractSteps(children: ReactNode): StepElementProps[] {
  return Children.toArray(children)
    .filter(isStepElement)
    .map((el) => ({ id: el.props.id, title: el.props.title }))
}

/** Small classnames helper (no dependency). */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
