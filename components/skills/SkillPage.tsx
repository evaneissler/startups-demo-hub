import Link from 'next/link'
import { Code, Command, Prompt } from '@/components/guide'
import { getDemo } from '@/lib/demos'
import { getSkill, getSkillGroup } from '@/lib/demos/skills'
import styles from './skills.module.css'

interface SkillPageProps {
  /** The skills folder this page sits in, e.g. `eve-assistant`. */
  group: string
  /** The skill's id within that group. */
  id: string
}

/** One skill: what it does, where it came from, and the file itself. */
export function SkillPage({ group, id }: SkillPageProps) {
  const skill = getSkill(group, id)

  if (!skill) {
    throw new Error(`Unknown skill "${id}" in group "${group}"`)
  }

  const demoSlug = getSkillGroup(group)?.demoSlug
  const demo = demoSlug ? getDemo(demoSlug) : undefined

  return (
    <article className={styles.detail}>
      <header className={styles.detailHead}>
        <p className={styles.eyebrow}>
          {demo && demoSlug ? (
            <Link className={styles.eyebrowLink} href={`/g/${demoSlug}`}>
              {demo.meta.title}
            </Link>
          ) : (
            'Skill'
          )}
        </p>
        <h1 className={styles.detailTitle}>{skill.name}</h1>
        {skill.file && <code className={styles.detailFile}>{skill.file}</code>}
        <p className={styles.detailSummary}>{skill.summary}</p>

        <p className={styles.detailLinks}>
          {demo?.meta.hasGuide && (
            <Link href={`/g/${demoSlug}#${skill.stepId}`}>See it in the guide</Link>
          )}
          {demoSlug && <Link href={`/demo/${demoSlug}`}>Watch the demo</Link>}
          {skill.href && (
            <a href={skill.href} target="_blank" rel="noreferrer">
              Where it comes from
            </a>
          )}
        </p>
      </header>

      {skill.source && (
        <>
          <p className={styles.note}>
            Save this as <code>{skill.file}</code> in your project. The frontmatter
            description is what the model reads to decide when to reach for it.
          </p>
          <Code lang="md" filename={skill.file}>
            {skill.source}
          </Code>
        </>
      )}

      {skill.prompt && (
        <>
          <p className={styles.note}>
            {skill.promptTool ?? 'A model'} writes this one for you. Run the prompt, then
            save what comes back as <code>{skill.file}</code>.
          </p>
          <Prompt tool={skill.promptTool}>{skill.prompt}</Prompt>
        </>
      )}

      {skill.install && (
        <>
          <p className={styles.note}>Install it instead of writing it:</p>
          <Command>{skill.install}</Command>
        </>
      )}
    </article>
  )
}
