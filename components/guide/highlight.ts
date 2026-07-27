import { createHighlighter, type Highlighter } from 'shiki'

const THEMES = { light: 'github-light', dark: 'github-dark' } as const

const LANGS = [
  'bash',
  'shell',
  'ts',
  'tsx',
  'js',
  'jsx',
  'json',
  'python',
  'md',
  'mdx',
  'html',
  'css',
  'text'
] as const

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: Object.values(THEMES),
      langs: [...LANGS]
    })
  }
  return highlighterPromise
}

/**
 * Server-side syntax highlighting via Shiki (the same engine Nextra uses).
 * Emits dual-theme output driven by CSS variables (`--shiki-light` /
 * `--shiki-dark`), which nextra-theme-docs already styles via `.nextra-code span`
 * — so the output inherits Nextra's native light/dark code colors.
 */
export async function highlight(code: string, lang: string): Promise<string> {
  const highlighter = await getHighlighter()
  const loaded = highlighter.getLoadedLanguages()
  const language = loaded.includes(lang) ? lang : 'text'
  return highlighter.codeToHtml(code.trimEnd(), {
    lang: language,
    themes: THEMES,
    defaultColor: false
  })
}

/**
 * Returns just the inner token markup (the `<span class="line">…`) so it can be
 * dropped into Nextra's native `<Code>` element inside `<Pre>`.
 */
export async function highlightInner(code: string, lang: string): Promise<string> {
  const html = await highlight(code, lang)
  const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/)
  return match ? match[1] : ''
}
