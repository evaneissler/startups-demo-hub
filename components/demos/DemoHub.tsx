import { getAllDemos, getFeaturedDemo } from '@/lib/demos'
import { DemoCard } from './DemoCard'
import styles from './hub.module.css'

/**
 * The demo hub: a hero recording plus a grid of everything else in the catalog.
 * Server-rendered — the cards are links and static preview frames, no client JS.
 */
export function DemoHub() {
  const demos = getAllDemos()
  const featured = getFeaturedDemo()
  const rest = demos.filter((demo) => demo.meta.slug !== featured?.meta.slug)

  return (
    <div className={styles.hub}>
      <header className={styles.hubHead}>
        <p className={styles.eyebrow}>Demo library</p>
        <h1 className={styles.hubTitle}>Watch it get built</h1>
        <p className={styles.hubLead}>
          Recorded end-to-end build sessions. Every demo is paired with a step-by-step
          build guide you can follow along with, complete with copyable commands, code,
          and prompts.
        </p>
      </header>

      {featured && (
        <section className={styles.heroSection} aria-labelledby="featured-demo">
          <h2 id="featured-demo" className={styles.sectionLabel}>
            Featured
          </h2>
          <DemoCard meta={featured.meta} featured />
        </section>
      )}

      {rest.length > 0 && (
        <section aria-labelledby="all-demos">
          <h2 id="all-demos" className={styles.sectionLabel}>
            All demos
          </h2>
          <div className={styles.grid}>
            {rest.map((demo) => (
              <DemoCard key={demo.meta.slug} meta={demo.meta} />
            ))}
          </div>
        </section>
      )}

      {demos.length === 0 && (
        <p className={styles.empty}>
          No recordings yet. Add one to the catalog in <code>lib/demos/index.ts</code>.
        </p>
      )}
    </div>
  )
}
