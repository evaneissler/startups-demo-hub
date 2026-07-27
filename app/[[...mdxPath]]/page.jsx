import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import { getDemo } from '../../lib/demos'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

const Wrapper = getMDXComponents().wrapper

/**
 * Build guides render their steps from React components rather than markdown
 * headings, so Nextra's remark pass finds nothing to build an outline from. The
 * steps *are* the outline, so they are read off the demo catalog for `/g/<slug>`
 * routes and handed to the theme as the table of contents.
 */
function getGuideToc(mdxPath) {
  if (mdxPath?.length !== 2 || mdxPath[0] !== 'g') return null

  const steps = getDemo(mdxPath[1])?.meta.steps
  if (!steps?.length) return null

  return steps.map((step) => ({ value: step.title, id: step.id, depth: 2 }))
}

export default async function Page(props) {
  const params = await props.params
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode
  } = await importPage(params.mdxPath)
  return (
    <Wrapper
      toc={getGuideToc(params.mdxPath) ?? toc}
      metadata={metadata}
      sourceCode={sourceCode}
    >
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
