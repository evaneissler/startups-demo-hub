import type { ReactNode } from 'react'
import { Pre, Code } from 'nextra/components'
import { nodeToText } from './utils'

interface PromptProps {
  children?: ReactNode
  /** Optional tool label, e.g. "Cursor", "Claude", "v0". */
  tool?: string
}

/**
 * An AI/agent prompt rendered in Nextra's native block with a copy button and a
 * filename bar used as the "Prompt / For <tool>" label. Word-wrapped for prose.
 */
export function Prompt({ children, tool }: PromptProps) {
  const text = nodeToText(children).trim()
  const label = tool ? `Prompt · For ${tool}` : 'Prompt'

  return (
    <Pre data-copy="" data-word-wrap="" data-filename={label} data-language="markdown">
      <Code data-language="markdown">
        {/* Match terminal/code line padding (Nextra applies px-4 to span children). */}
        <span>{text}</span>
      </Code>
    </Pre>
  )
}
