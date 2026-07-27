import { notFound } from 'next/navigation'
import { DemoView } from '@/components/guide/DemoView'
import { getDemo } from '@/lib/demos'

interface DemoPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { getDemoSlugs } = await import('@/lib/demos')
  return getDemoSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: DemoPageProps) {
  const resolved = await params
  if (!resolved?.slug) return { title: 'Demo' }
  const demo = getDemo(resolved.slug)
  if (!demo?.meta.recording) return { title: 'Demo not found' }
  return {
    title: demo.meta.title,
    description: demo.meta.summary
  }
}

export default async function DemoPage({ params }: DemoPageProps) {
  const resolved = await params
  if (!resolved?.slug) notFound()
  const { slug } = resolved
  const demo = getDemo(slug)

  if (!demo?.meta.recording?.src) notFound()

  const { meta, Steps } = demo

  return (
    <DemoView meta={meta}>
      <Steps />
    </DemoView>
  )
}
