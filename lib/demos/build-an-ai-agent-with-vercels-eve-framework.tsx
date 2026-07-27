import type { DemoMeta } from '@/components/guide/types'
import { Step, Description } from '@/components/guide'
import { william, neha } from './hosts'

export const demoMeta: DemoMeta = {
  slug: 'build-an-ai-agent-with-vercels-eve-framework',
  title: "Building an AI agent with Vercel's Eve framework",
  date: 'July 16, 2026',
  summary:
    'A live office hours walkthrough of the whole Vercel platform, wall by wall, then a hands on build of an agent using Eve, from a bare terminal command to a weather assistant and a web developer agent that codes a live site.',
  tags: ['Eve', 'agents', 'AI Gateway', 'office hours'],
  hosts: [william, neha],
  steps: [
    { id: 'intro', title: 'Welcome to office hours' },
    { id: 'platform-walls', title: 'Every wall a startup hits' },
    { id: 'agentic-layer', title: 'Adding the agentic layer' },
    { id: 'eve-anatomy', title: 'The anatomy of an Eve agent' },
    { id: 'eve-live-build', title: 'Live build: from init to a working agent' },
    { id: 'd0-example', title: 'How Vercel builds its own agents' },
    { id: 'closing', title: 'Wrap up' }
  ],
  recording: {
    src: '/demos/build-an-ai-agent-with-vercels-eve-framework.mp4',
    duration: 1924,
    taps: [
      { stepId: 'intro', t: 0 },
      { stepId: 'platform-walls', t: 242 },
      { stepId: 'agentic-layer', t: 512 },
      { stepId: 'eve-anatomy', t: 800 },
      { stepId: 'eve-live-build', t: 1217 },
      { stepId: 'd0-example', t: 1715 },
      { stepId: 'closing', t: 1830 }
    ]
  }
}

export function DemoSteps() {
  return (
    <>
      <Step id="intro" title="Welcome to office hours">
        <Description>
          William and Neha, solutions architects on Vercel&apos;s startups team, open the
          session and set the agenda: go from a blank idea to a working company in front of
          the audience, hitting every wall a founder normally hits along the way on purpose.
        </Description>
        <Description>
          The plan is to first show how Vercel covers the whole stack wall to wall, then have
          William build a real agent live using Eve, Vercel&apos;s agent framework.
        </Description>
      </Step>

      <Step id="platform-walls" title="Every wall a startup hits">
        <Description>
          Neha lays out the walls every founder hits as they grow: shipping the first
          deployment, turning a page into a real application with servers and APIs, and
          giving that application durable storage.
        </Description>
        <Description>
          For each wall she shows the Vercel answer. Deployments give you a global edge
          network and a preview URL for every branch and commit. Vercel Functions let you add
          a backend in Python, Node, or whatever you are already writing, in the same repo and
          the same deploy, running on fluid compute so you never pay for idle servers. Storage
          comes from marketplace integrations like Neon and Supabase, with no cluster to
          babysit.
        </Description>
      </Step>

      <Step id="agentic-layer" title="Adding the agentic layer">
        <Description>
          With hosting, backend, and storage covered, Neha moves into the agentic layer:
          making the product think instead of just following fixed rules.
        </Description>
        <Description>
          The AI SDK gives one interface to any model provider, and AI Gateway sits behind it
          with a single key, automatic failover, and spend tracking, so switching models is a
          one line change instead of a rewrite. Vercel Workflows keep long running agent jobs
          alive across retries and crashes, Sandbox gives untrusted agent code its own isolated
          machine, and Vercel Connect hands out short lived, task scoped access to tools like
          Salesforce, Linear, and Slack instead of leaving API keys sitting in your code.
        </Description>
      </Step>

      <Step id="eve-anatomy" title="The anatomy of an Eve agent">
        <Description>
          William takes over to show what you actually do with all of these pieces: Eve,
          Vercel&apos;s framework for building agents without managing the infrastructure
          behind them.
        </Description>
        <Description>
          At its core an Eve agent is just files in folders, similar to Next.js routing. An{' '}
          <code>agent.ts</code> file is the brain, picking the model and its parameters, and an{' '}
          <code>instructions.md</code> file is the personality, written in plain markdown.
          Skills are markdown playbooks that teach the agent how you do a task step by step.
          Tools are the hands, one TypeScript file each, that let the agent fetch data or call
          an API. Channels let the same agent be reached from Slack, Discord, or anywhere else
          your team already works. Sandbox is the safe space where the agent runs code without
          risking anything else. Connections plug in third party services like Notion.
          Sub-agents let a strong reasoning model delegate execution to smaller, cheaper
          models, and schedules run tasks on a timer with nobody in the loop.
        </Description>
      </Step>

      <Step id="eve-live-build" title="Live build: from init to a working agent">
        <Description>
          William sets up an Eve agent live in three steps: run the init command in a
          terminal, name the agent, and connect a model, recommending AI Gateway so credits
          and every provider are available through one key from the start.
        </Description>
        <Description>
          The first agent out of the box already chats in the terminal. He then upgrades it to
          a weather assistant by adding one instructions update and a 13 line{' '}
          <code>get-weather</code> tool, and asks it for the weather in New York City to show
          the tool call happen live.
        </Description>
        <Description>
          Next he adds channels as single files, wiring the same agent into Slack, Discord,
          Telegram, and Twilio in a few minutes. Finally he loads a pre-built web developer
          agent with its own skill and tool, prompts it to build a marketing page for a random
          startup, and watches it spin up a Sandbox and code out a live site in under a minute.
        </Description>
      </Step>

      <Step id="d0-example" title="How Vercel builds its own agents">
        <Description>
          Neha closes the loop by showing D0, an internal Vercel agent that acts as an
          on-demand data scientist for the team, built on exactly the stack just
          demonstrated.
        </Description>
        <Description>
          It uses the Chat SDK connected to Slack where the team already works, the AI SDK to
          run the reason, call tools, and respond loop, AI Gateway to call any model with one
          key, workflows for durable tool calls with a human in the loop, and Sandbox to search
          the file system safely. It is the same recipe available to any startup building an
          agent today.
        </Description>
      </Step>

      <Step id="closing" title="Wrap up">
        <Description>
          William and Neha point out that nothing they built required any infrastructure work,
          just the product itself, because Vercel is handling deployment, compute, storage, and
          the agent runtime underneath it.
        </Description>
        <Description>
          They wrap with an invite to follow along as they build a startup end to end in future
          sessions, and to reach out on LinkedIn with questions.
        </Description>
      </Step>
    </>
  )
}
