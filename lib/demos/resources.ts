import type { DemoSkill, Requirement } from '@/components/guide'
import { getAllDemos } from './index'
import { getSkillsForDemo, skillHref } from './skills'

export interface GuideResources {
  requirements: Requirement[]
  skills: DemoSkill[]
}

/**
 * Per-guide resources keyed by slug, as plain data. The rail that renders them
 * lives in the theme's right-hand column, which is shared by every page, so it
 * picks its guide out of this map by route.
 *
 * Skills are flattened to name, note and href here so the client never receives
 * the skill sources, which are only needed on the skill pages themselves.
 */
export function getGuideResourceIndex(): Record<string, GuideResources> {
  const index: Record<string, GuideResources> = {}

  for (const { meta } of getAllDemos()) {
    const slug = meta.slug
    if (!slug || !meta.hasGuide) continue

    const requirements = meta.requirements ?? []
    const group = getSkillsForDemo(slug)
    const skills: DemoSkill[] = group
      ? group.skills.map((skill) => ({
          name: skill.name,
          note: skill.summary,
          href: skillHref(group.segment, skill.id)
        }))
      : []

    if (!requirements.length && !skills.length) continue

    index[slug] = { requirements, skills }
  }

  return index
}
