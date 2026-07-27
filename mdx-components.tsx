import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import type { MDXComponents } from 'nextra/mdx-components'
import {
  Guide,
  Step,
  Description,
  Command,
  Code,
  Prompt
} from './components/guide'

const docsComponents = getDocsMDXComponents()

// Build-guide components, available in every .mdx page without importing.
const guideComponents = {
  Guide,
  Step,
  Description,
  Command,
  Code,
  Prompt
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...docsComponents,
    ...guideComponents,
    ...components
  }
}
