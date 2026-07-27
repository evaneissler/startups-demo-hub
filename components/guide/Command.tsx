import type { ReactNode } from 'react'
import { Pre, Code } from 'nextra/components'
import { highlightInner } from './highlight'
import { nodeToText } from './utils'

interface CommandProps {
  children?: ReactNode
  /** Override the highlighting language (defaults to shell). */
  lang?: string
}

/**
 * A shell command rendered with Nextra's native code block (copy button, filename
 * bar, dark/light styling all come from the theme). Async server component.
 */
export async function Command({ children, lang = 'bash' }: CommandProps) {
  const text = nodeToText(children).trim()
  const inner = await highlightInner(text, lang)

  return (
    <Pre data-copy="" data-language={lang} data-filename="Terminal">
      <Code
        data-language={lang}
        dangerouslySetInnerHTML={{ __html: inner }}
      />
    </Pre>
  )
}
