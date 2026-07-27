import { formatDuration, getAllDemos } from './index'

/**
 * The demo catalog flattened to plain data so it can cross into the client for
 * the search modal. The catalog itself holds React components, which cannot.
 */
export interface SearchDemo {
  slug: string
  title: string
  summary?: string
  tags: string[]
  /** Preformatted, e.g. `31:10`. */
  duration: string | null
  stepCount: number
  /** Step titles are searchable so "slack" finds the demo that covers Slack. */
  stepTitles: string[]
  src?: string
  poster?: string
  thumbnailTime?: number
  featured: boolean
  hasGuide: boolean
}

export function getSearchIndex(): SearchDemo[] {
  return getAllDemos().map(({ meta }) => ({
    slug: meta.slug ?? '',
    title: meta.title,
    summary: meta.summary,
    tags: meta.tags ?? [],
    duration: formatDuration(meta.recording?.duration),
    stepCount: meta.steps?.length ?? 0,
    stepTitles: meta.steps?.map((step) => step.title) ?? [],
    src: meta.recording?.src,
    poster: meta.poster,
    thumbnailTime: meta.thumbnailTime,
    featured: !!meta.featured,
    hasGuide: !!meta.hasGuide
  }))
}
