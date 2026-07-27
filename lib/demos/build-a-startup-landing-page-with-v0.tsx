import type { DemoMeta } from '@/components/guide/types'
import { Step, Description, Prompt } from '@/components/guide'
import { neha, william } from './hosts'

export const demoMeta: DemoMeta = {
  slug: 'build-a-startup-landing-page-with-v0',
  title: 'Build a startup landing page with v0',
  date: 'July 24, 2026',
  summary:
    'One long, opinionated prompt turns into a finished marketing site for TARS, a fictional startup. A few follow-ups tighten the details, then it ships to a live Vercel URL.',
  tags: ['v0', 'design', 'landing pages', 'Vercel'],
  hosts: [william, neha],
  thumbnailTime: 152,
  steps: [
    { id: 'showcase', title: 'The finished page' },
    { id: 'start', title: 'Start in v0' },
    { id: 'context', title: 'Give v0 your context' },
    { id: 'prompt', title: 'Write the prompt like a brief' },
    { id: 'iterate', title: 'Iterate in the preview' },
    { id: 'publish', title: 'Publish it' }
  ],
  recording: {
    src: '/demos/tars-v0-demo.mp4',
    duration: 156.7,
    taps: [
      { stepId: 'showcase', t: 0 },
      { stepId: 'start', t: 14 },
      { stepId: 'context', t: 34 },
      { stepId: 'prompt', t: 56 },
      { stepId: 'iterate', t: 94 },
      { stepId: 'publish', t: 120 }
    ]
  }
}

/** Step content for the player's side card. This demo has no build guide page. */
export function DemoSteps() {
  return (
    <>
      <Step id="showcase" title="The finished page">
        <Description>
          The end result first: a marketing site for TARS, a fictional agentic
          assistant for founders. Stark hero, a strip of connector logos, numbered
          sections, three pricing tiers, and an FAQ. No stock illustrations and no
          template feel.
        </Description>
        <Description>
          It is one v0 generation plus a handful of follow-ups, and it ends the demo
          on a real URL.
        </Description>
      </Step>

      <Step id="start" title="Start in v0">
        <Description>
          Everything begins at the v0 prompt box with the model set to v0 Max, which
          is the one worth reaching for when the output is a whole page rather than a
          single component.
        </Description>
      </Step>

      <Step id="context" title="Give v0 your context">
        <Description>
          Before typing anything, the attachment menu is where a generation stops
          being generic:
        </Description>
        <Description>
          <ul>
            <li>
              <strong>Skills</strong> are reusable instructions you or your team have
              already written, like <code>add-auth-layer</code> or{' '}
              <code>vercel-react-best-practices</code>.
            </li>
            <li>
              <strong>Design systems</strong> pin the output to a real component
              library and token set, such as Geist, rather than whatever v0 would
              pick on its own.
            </li>
            <li>
              <strong>Instructions, MCPs, and repositories</strong> bring in standing
              rules, live tools, and existing code from GitHub or Figma.
            </li>
          </ul>
        </Description>
      </Step>

      <Step id="prompt" title="Write the prompt like a brief">
        <Description>
          The prompt is not one sentence. It is a written brief with sections for the
          product, the aesthetic direction, the stack, the voice, and the page
          structure, kept in a doc so it can be edited and reused. Vague prompts are
          what produce generic pages.
        </Description>
        <Prompt tool="v0">{`Build the marketing landing page for TARS, a startup product. Use real, final copy exactly as written below, not placeholders.

PRODUCT
TARS is an agentic assistant that connects to a founder's stack and quietly does the heavy lifting. You delegate multi-step busywork in plain language (for example: reconcile last month's invoices and flag anything weird; research these five competitors and draft a one-pager; watch these sites and summarize them every morning). TARS plans the task, uses your tools and the live web, runs as long as it needs to, and hands back finished work. Personality: dry, deadpan, hyper-competent, inspired by the TARS robot from Interstellar. Humor high, honesty higher.

AESTHETIC DIRECTION
The page should feel like a high-end, modern developer-tool startup: calm, precise, structured, confident, and expensive. Restraint over decoration. Whitespace and thin hairline structure do the work, not color or effects. Nothing should feel busy, playful-cute, or templated. Think quiet confidence: a stark hero, generous air, crisp 1px lines organizing the page, and typography carrying the hierarchy. When in doubt, remove an element and add space.`}</Prompt>
        <Description>
          The brief goes on to pin the stack (Next.js App Router, TypeScript,
          Tailwind CSS v4, shadcn/ui, lucide-react, Geist Sans and Geist Mono) and
          then gets specific about rhythm: a full-width 1px divider between every
          section, mono uppercase eyebrows numbered <code>01 / THE PROBLEM</code>{' '}
          through <code>05 / FAQ</code>, body text capped around 60 to 68 characters,
          and no em dashes anywhere in the copy.
        </Description>
      </Step>

      <Step id="iterate" title="Iterate in the preview">
        <Description>
          From there it is a conversation against the live preview. Small, specific
          follow-ups land as new versions:
        </Description>
        <Prompt tool="v0">{`make logo text bolder in nav bar`}</Prompt>
        <Description>
          Every turn is a version you can inspect, revert, or branch from, so
          experiments are cheap and nothing gets lost on the way to the design you
          wanted.
        </Description>
      </Step>

      <Step id="publish" title="Publish it">
        <Description>
          Publish puts the page on a live Vercel deployment, with the domain,
          visibility, analytics, and a repository all one click away in the same
          panel. Open the project in Vercel and it behaves like any other: production
          deployment, observability, instant rollback.
        </Description>
        <Description>
          Roughly two and a half minutes from an empty prompt box to a shipped
          marketing site.
        </Description>
      </Step>
    </>
  )
}
