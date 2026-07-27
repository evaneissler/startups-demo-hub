import type { DemoMeta } from '@/components/guide/types'
import { Step, Description, Command, Code, Requirements } from '@/components/guide'
import { william } from './hosts'

export const demoMeta: DemoMeta = {
  slug: 'build-a-durable-workflow-with-vercel-workflows',
  title: 'Build a durable workflow with Vercel Workflows',
  date: 'July 27, 2026',
  summary:
    'Turn a plain async function into a durable, retryable workflow with the Workflow SDK, then deploy it to Vercel. No queues, state machines, or extra infrastructure to configure.',
  tags: ['Workflows', 'Next.js', 'Durable Execution', 'Webinar'],
  hosts: [william],
  hasGuide: true,
  highlights: [
    {
      label: 'What you build',
      value:
        'A minimal onboarding workflow, deployed on Vercel, that fetches a user, generates a welcome email, and sends it, with each step retried automatically on failure.'
    },
    {
      label: 'What you need',
      value: 'A Vercel account, Node.js 18 or newer, and a Next.js project to add the SDK to.'
    },
    {
      label: 'What it covers',
      value:
        'Core Workflow SDK concepts, installing the SDK, writing a workflow and its steps, running it locally, deploying to Vercel, and reading run traces in the dashboard.'
    },
    {
      label: 'How long it takes',
      value: 'About 30 to 45 minutes as a live walkthrough, plus time for questions.'
    }
  ],
  requirements: [
    {
      brand: 'vercel',
      name: 'Vercel',
      note: 'Hosts the workflow with queues, persistence, and observability built in. No extra infrastructure to configure.',
      href: 'https://vercel.com/signup',
      action: 'Sign up'
    },
    {
      brand: 'node',
      name: 'Node.js',
      note: 'Version 18 or newer, so you can install and run the Workflow SDK locally.',
      href: 'https://nodejs.org/en/download',
      action: 'Download'
    }
  ],
  steps: [
    { id: 'overview', title: 'Why durable workflows' },
    { id: 'requirements', title: 'What you need' },
    { id: 'install', title: 'Install the Workflow SDK' },
    { id: 'first-workflow', title: 'Write your first workflow' },
    { id: 'run-locally', title: 'Run it locally' },
    { id: 'deploy', title: 'Deploy to Vercel' },
    { id: 'observe', title: 'Inspect runs and debug' },
    { id: 'wrap-up', title: 'Wrap up' }
  ]
  // No `recording` — this is a video-less guide. A webinar recording can be added later.
}

/** Shared step content, used by the build guide page and the demo playback view. */
export function DemoSteps() {
  return (
    <>
      <Step id="overview" title="Why durable workflows">
        <Description>
          Long-running or multi-step tasks, like onboarding a user across a database write, an
          AI call, and an email send, are painful to build reliably on a plain serverless
          function. One dropped request and you are hand-rolling queues, retries, and a place to
          store progress.
        </Description>
        <Description>
          The Workflow SDK turns an ordinary async function into a durable workflow with two
          directives, <code>&quot;use workflow&quot;</code> and <code>&quot;use step&quot;</code>
          . Vercel runs it on Fluid compute with Vercel Queues underneath, so it survives
          crashes and deploys and resumes from exactly where it left off.
        </Description>
      </Step>

      <Step id="requirements" title="What you need">
        <Description>
          Everything here works on Vercel&apos;s free tier. Have a Next.js project ready, new or
          existing, before you start.
        </Description>
        <Requirements items={demoMeta.requirements ?? []} />
      </Step>

      <Step id="install" title="Install the Workflow SDK">
        <Description>
          Add the <code>workflow</code> package to your project. It is open source and framework
          agnostic, and Vercel is the zero-config way to run it.
        </Description>
        <Command>{`npm install workflow`}</Command>
        <Description>
          Optionally teach your coding agent the framework so it can help you scaffold and debug
          workflows:
        </Description>
        <Command>{`npx skills add vercel/workflow`}</Command>
      </Step>

      <Step id="first-workflow" title="Write your first workflow">
        <Description>
          A workflow is a function marked with <code>&quot;use workflow&quot;</code>. Each thing
          it awaits, like a database read or an email send, is its own function marked with{' '}
          <code>&quot;use step&quot;</code>. Steps compile to isolated, independently retried
          function invocations, so a failure in one does not restart the whole run.
        </Description>
        <Code lang="ts" filename="workflows/welcome.ts">{`export async function welcome(userId: string) {
  "use workflow";

  const user = await getUser(userId);
  const { subject, body } = await generateEmail({
    name: user.name,
    plan: user.plan,
  });
  const { status } = await sendEmail({
    to: user.email,
    subject,
    body,
  });

  return { status, subject, body };
}

async function getUser(userId: string) {
  "use step";
  return db.user.findUnique({ where: { id: userId } });
}

async function generateEmail({ name, plan }: { name: string; plan: string }) {
  "use step";
  // Call your AI SDK or templating logic here.
  return {
    subject: \`Welcome, \${name}!\`,
    body: \`Thanks for joining the \${plan} plan.\`,
  };
}

async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  "use step";
  // Send with your email provider of choice.
  return { status: "sent" };
}`}</Code>
        <Description>
          If <code>sendEmail</code> throws, only that step retries. The workflow does not
          re-fetch the user or regenerate the email it already has.
        </Description>
      </Step>

      <Step id="run-locally" title="Run it locally">
        <Description>
          Call the workflow from an API route like any other async function. Locally, the SDK
          runs on a Local World that simulates the queue and event log with no infrastructure to
          provision.
        </Description>
        <Code lang="ts" filename="app/api/onboard/route.ts">{`import { welcome } from "@/workflows/welcome";

export async function POST(req: Request) {
  const { userId } = await req.json();
  const result = await welcome(userId);
  return Response.json(result);
}`}</Code>
        <Description>
          Start your dev server and hit the route. Watch the terminal and you will see each step
          queue and complete in order.
        </Description>
        <Command>{`npm run dev`}</Command>
      </Step>

      <Step id="deploy" title="Deploy to Vercel">
        <Description>
          Push the project to Vercel. Framework-defined infrastructure detects the durable
          function and provisions the queue and persistence for it automatically, no config
          files required.
        </Description>
        <Command>{`vercel deploy`}</Command>
        <Description>
          Trigger the workflow in production the same way you did locally. Running workflows
          keep executing on the version they started on, so a deploy never interrupts a run in
          flight.
        </Description>
      </Step>

      <Step id="observe" title="Inspect runs and debug">
        <Description>
          Every step, input, output, and error is recorded automatically. In the Vercel
          dashboard, open your project&apos;s Observability tab and select Workflows to see each
          run as a trace, with timing for every step.
        </Description>
        <Description>
          To inspect a run from the terminal instead, the CLI reuses your <code>vercel</code> CLI
          login:
        </Description>
        <Command>{`npx workflow inspect runs <wrun_id>`}</Command>
      </Step>

      <Step id="wrap-up" title="Wrap up">
        <Description>
          You now have a workflow that survives crashes and deploys, retries only the step that
          failed, and reports its own progress. Reach for Workflows instead of a plain function
          any time the logic needs to span multiple steps, pause and resume, or run longer than
          a single request.
        </Description>
        <Description>
          Full docs live at{' '}
          <a href="https://vercel.com/docs/workflows" target="_blank" rel="noreferrer">
            vercel.com/docs/workflows
          </a>{' '}
          and{' '}
          <a href="https://workflow-sdk.dev" target="_blank" rel="noreferrer">
            workflow-sdk.dev
          </a>
          .
        </Description>
      </Step>
    </>
  )
}
