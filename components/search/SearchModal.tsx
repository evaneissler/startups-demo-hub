'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { VideoThumb } from '@/components/demos/VideoThumb'
import type { SearchDemo } from '@/lib/demos/search-index'
import { setSearchOpen, toggleSearch, useSearchOpen } from './search-store'
import { SearchIcon } from './SearchTrigger'
import styles from './search.module.css'

const LIST_ID = 'demo-search-results'
const optionId = (slug: string) => `demo-search-option-${slug}`

interface SearchModalProps {
  demos: SearchDemo[]
  /** How many demos to offer before anything has been typed. */
  recommendedCount?: number
}

/**
 * Centered command palette for the demo catalog. Mounted once at the root; the
 * navbar trigger and the ⌘K shortcut both drive it through `search-store`.
 *
 * A native `<dialog>` handles the backdrop, focus trapping, Escape, and making
 * the page behind inert, so none of that is reimplemented here.
 */
export function SearchModal({ demos, recommendedCount = 4 }: SearchModalProps) {
  const open = useSearchOpen()
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  /* The dialog sits in every page's markup, so its preview frames only mount
   * once it has actually been opened — otherwise each page load would
   * range-request a frame out of every recording in the catalog. */
  const [hasOpened, setHasOpened] = useState(false)

  const recommended = useMemo(
    () =>
      [...demos]
        .sort((a, b) => Number(b.featured) - Number(a.featured))
        .slice(0, recommendedCount),
    [demos, recommendedCount]
  )

  const isSearching = query.trim().length > 0
  const results = useMemo(
    () => (isSearching ? rank(demos, query) : recommended),
    [demos, query, isSearching, recommended]
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      setQuery('')
      setActiveIndex(0)
      setHasOpened(true)
      dialog.showModal()
      inputRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSearch()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const go = useCallback(
    (slug: string) => {
      setSearchOpen(false)
      router.push(`/demo/${slug}`)
    },
    [router]
  )

  function onDialogKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const delta = event.key === 'ArrowDown' ? 1 : -1
      const next = Math.min(Math.max(activeIndex + delta, 0), results.length - 1)
      setActiveIndex(next)
      listRef.current
        ?.querySelectorAll('li')
        [next]?.scrollIntoView({ block: 'nearest' })
      return
    }

    if (event.key === 'Enter') {
      const demo = results[activeIndex]
      if (demo) {
        event.preventDefault()
        go(demo.slug)
      }
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Search demos"
      onClose={() => setSearchOpen(false)}
      onKeyDown={onDialogKeyDown}
      onClick={(event) => {
        // Clicks land on the dialog itself only when they hit the backdrop.
        if (event.target === dialogRef.current) setSearchOpen(false)
      }}
    >
      <div className={styles.panel}>
        <div className={styles.searchRow}>
          <SearchIcon className={styles.searchRowIcon} />
          {/* Combobox wiring: focus stays in the field while the arrow keys move
            * the highlight, so the active row is announced from here. */}
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search demos, guides, and steps…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            aria-label="Search demos"
            role="combobox"
            aria-expanded
            aria-autocomplete="list"
            aria-controls={LIST_ID}
            aria-activedescendant={
              results[activeIndex] ? optionId(results[activeIndex].slug) : undefined
            }
          />
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setSearchOpen(false)}
          >
            Esc
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.sectionLabel}>
            {isSearching
              ? `${results.length} ${results.length === 1 ? 'result' : 'results'}`
              : 'Recommended'}
          </p>

          {results.length === 0 ? (
            <p className={styles.empty}>
              No demos match <strong>{query.trim()}</strong>.
            </p>
          ) : (
            <ul
              id={LIST_ID}
              role="listbox"
              aria-label="Demos"
              className={styles.results}
              ref={listRef}
            >
              {results.map((demo, index) => (
                <li
                  key={demo.slug}
                  id={optionId(demo.slug)}
                  role="option"
                  aria-selected={index === activeIndex}
                  data-active={index === activeIndex || undefined}
                >
                  <a
                    href={`/demo/${demo.slug}`}
                    className={styles.result}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={(event) => {
                      event.preventDefault()
                      go(demo.slug)
                    }}
                  >
                    <span className={styles.thumbFrame}>
                      {demo.src && hasOpened && (
                        <VideoThumb
                          className={styles.thumb}
                          meta={{
                            title: demo.title,
                            poster: demo.poster,
                            thumbnailTime: demo.thumbnailTime,
                            recording: { src: demo.src }
                          }}
                        />
                      )}
                      {demo.duration && (
                        <span className={styles.durationBadge}>{demo.duration}</span>
                      )}
                    </span>

                    <span className={styles.resultBody}>
                      <span className={styles.resultTitle}>{demo.title}</span>
                      {demo.summary && (
                        <span className={styles.resultSummary}>{demo.summary}</span>
                      )}
                      <span className={styles.resultMeta}>
                        {demo.stepCount > 0 && <span>{demo.stepCount} steps</span>}
                        {demo.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.footer}>
          <span>
            <kbd className={styles.kbd}>↑</kbd>
            <kbd className={styles.kbd}>↓</kbd> to navigate
          </span>
          <span>
            <kbd className={styles.kbd}>↵</kbd> to watch
          </span>
          <span>
            <kbd className={styles.kbd}>esc</kbd> to close
          </span>
        </div>
      </div>
    </dialog>
  )
}

/**
 * Every whitespace-separated term has to match somewhere; the best field it
 * matches decides how much it contributes, so a title hit outranks a step hit.
 */
function rank(demos: SearchDemo[], query: string): SearchDemo[] {
  const terms = query.trim().toLowerCase().split(/\s+/)
  const scored: Array<{ demo: SearchDemo; score: number }> = []

  for (const demo of demos) {
    const fields: Array<[string, number]> = [
      [demo.title, 4],
      [demo.tags.join(' '), 3],
      [demo.stepTitles.join(' '), 2],
      [demo.summary ?? '', 1]
    ]

    let score = 0
    let matchedEveryTerm = true

    for (const term of terms) {
      let best = 0
      for (const [text, weight] of fields) {
        if (text.toLowerCase().includes(term)) best = Math.max(best, weight)
      }
      if (!best) {
        matchedEveryTerm = false
        break
      }
      score += best
    }

    if (matchedEveryTerm) scored.push({ demo, score })
  }

  return scored.sort((a, b) => b.score - a.score).map(({ demo }) => demo)
}
