import type { ReactNode } from 'react'
import { Pre, Code as NextraCode } from 'nextra/components'
import { highlightInner } from './highlight'
import { nodeToText } from './utils'

interface CodeProps {
  children?: ReactNode
  lang?: string
  filename?: string
}

/**
 * A syntax-highlighted code block using Nextra's native code chrome. Author the
 * code as a template string inside a JSX expression to keep braces/brackets safe:
 *
 * ```mdx
 * <Code lang="ts" filename="index.ts">{`
 * const answer = { value: 42 }
 * `}</Code>
 * ```
 */
export async function Code({ children, lang = 'text', filename }: CodeProps) {
  const text = nodeToText(children).replace(/^\n+/, '').replace(/\s+$/, '')
  const inner = await highlightInner(text, lang)

  return (
    <Pre
      data-copy=""
      data-language={lang}
      data-word-wrap=""
      {...(filename ? { 'data-filename': filename } : {})}
    >
      <NextraCode
        data-language={lang}
        dangerouslySetInnerHTML={{ __html: inner }}
      />
    </Pre>
  )
}
