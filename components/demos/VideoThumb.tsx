import type { DemoMeta } from '@/components/guide/types'

interface VideoThumbProps {
  meta: DemoMeta
  className?: string
}

/**
 * A static preview frame for a demo card. With no generated poster images
 * available, the frame is pulled straight out of the recording using a media
 * fragment (`#t=`) plus `preload="metadata"`, so the browser range-requests a
 * single frame instead of downloading the whole file. A real poster image is
 * used directly whenever one is set.
 */
export function VideoThumb({ meta, className }: VideoThumbProps) {
  const src = meta.recording?.src
  if (!src) return null

  if (meta.poster) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} src={meta.poster} alt="" aria-hidden="true" />
  }

  return (
    <video
      className={className}
      src={`${src}#t=${meta.thumbnailTime ?? 8}`}
      preload="metadata"
      muted
      playsInline
      tabIndex={-1}
      aria-hidden="true"
    />
  )
}
