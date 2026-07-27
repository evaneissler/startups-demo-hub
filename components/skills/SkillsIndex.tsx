import Link from 'next/link'
import { getDemo } from '@/lib/demos'
import { skillGroups, skillHref } from '@/lib/demos/skills'
import styles from './skills.module.css'

/**
 * The section's landing page: every skill grouped by the build it came from,
 * each linking to its own page. The sidebar carries the same tree.
 */
export function SkillsIndex() {
  const groups = skillGroups
    .map((group) => ({ ...group, demo: getDemo(group.demoSlug) }))
    .filter((group) => group.skills.length > 0)

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Skill library</p>
        <h1 className={styles.title}>Skills from the builds</h1>
        <p className={styles.lead}>
          A skill is a markdown file that tells an agent how you want a job done. These
          are the ones written in the demos — drop one in your agent&apos;s{' '}
          <code>skills/</code> folder and it picks it up, no registration needed.
        </p>
      </header>

      {groups.map(({ segment, demoSlug, demo, skills }) => {
        const title = demo?.meta.title ?? demoSlug
        const headingId = `project-${segment}`

        return (
          <section key={segment} className={styles.group} aria-labelledby={headingId}>
            <h2 id={headingId} className={styles.groupTitle}>
              {demo?.meta.hasGuide ? (
                <Link href={`/g/${demoSlug}`} className={styles.groupLink}>
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
            <p className={styles.groupMeta}>
              <span>
                {skills.length} skill{skills.length === 1 ? '' : 's'}
              </span>
              {demo && <Link href={`/demo/${demoSlug}`}>Watch the demo</Link>}
            </p>

            <ul className={styles.list}>
              {skills.map((skill) => (
                <li key={skill.id} className={styles.row}>
                  <Link className={styles.rowLink} href={skillHref(segment, skill.id)}>
                    <span className={styles.rowHead}>
                      <span className={styles.rowName}>{skill.name}</span>
                      {skill.file && (
                        <code className={styles.rowFile}>{skill.file}</code>
                      )}
                    </span>
                    <span className={styles.rowSummary}>{skill.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
