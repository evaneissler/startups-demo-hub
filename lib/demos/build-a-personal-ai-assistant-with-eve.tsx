import type { DemoMeta } from '@/components/guide/types'
import {
  Step,
  Description,
  Command,
  Code,
  Prompt,
  Requirements
} from '@/components/guide'
import { neha, william } from './hosts'
import { eveSkills } from './skills'

export const demoMeta: DemoMeta = {
  slug: 'build-a-personal-ai-assistant-with-eve',
  title: 'Build a personal AI assistant with Eve',
  date: 'July 23, 2026',
  summary:
    'Go from one terminal command to an agent living on Vercel that you chat with in Slack. It reads your Notion meeting notes, pulls the weather and the news, and drafts follow-up emails in your voice.',
  tags: ['Eve', 'agents', 'Slack', 'Notion'],
  hosts: [william, neha],
  highlights: [
    {
      label: 'What you build',
      value:
        'Alfred, an agent hosted on Vercel that answers in Slack, reads your Notion meeting notes, and drafts follow-up emails in your voice.'
    },
    {
      label: 'What you need',
      value:
        'A Vercel account with AI Gateway credit, an editor, and a Slack and Notion workspace you can connect.'
    },
    {
      label: 'What it covers',
      value:
        'Five Eve primitives: tools, skills, channels, connections, and schedules.'
    },
    {
      label: 'How long it takes',
      value: 'About 30 minutes, and no code you have to write yourself.'
    }
  ],
  featured: true,
  hasGuide: true,
  poster: '/agent-build-thumbnail.png',
  requirements: [
    {
      brand: 'node',
      name: 'Node.js',
      note: 'Version 18 or newer, so npx can run the Eve installer.',
      href: 'https://nodejs.org/en/download',
      action: 'Download'
    },
    {
      brand: 'cursor',
      name: 'Cursor',
      note: 'The editor used throughout. Any editor works, but the prompts here are written for it.',
      href: 'https://cursor.com/downloads',
      action: 'Download'
    },
    {
      brand: 'vercel',
      name: 'Vercel',
      note: 'Hosts the agent and provides the AI Gateway key. Eve creates the project for you.',
      href: 'https://vercel.com/new',
      action: 'Create a project'
    },
    {
      brand: 'slack',
      name: 'Slack',
      note: 'A workspace you can install an app into, so the agent has somewhere to answer.',
      href: 'https://slack.com/get-started',
      action: 'Create a workspace'
    },
    {
      brand: 'notion',
      name: 'Notion',
      note: 'Where the meeting notes live. Any page the agent can read will do.',
      href: 'https://www.notion.com/signup',
      action: 'Create a workspace'
    },
    {
      brand: 'claude',
      name: 'Claude',
      note: 'Writes the skill that captures your email voice, from your own sent mail.',
      href: 'https://claude.ai',
      action: 'Open Claude'
    }
  ],
  steps: [
    { id: 'showcase', title: 'What you are building' },
    { id: 'requirements', title: 'What you need before you start' },
    { id: 'primitives', title: 'The primitives you get' },
    { id: 'setup', title: 'Spin up the agent' },
    { id: 'personality', title: 'Give it a personality' },
    { id: 'weather-tool', title: 'Add a weather tool' },
    { id: 'news-tool', title: 'Add a news tool' },
    { id: 'morning-report', title: 'Write the morning report skill' },
    { id: 'slack', title: 'Put the agent in Slack' },
    { id: 'notion', title: 'Connect Notion' },
    { id: 'email-drafter', title: 'Teach it your email voice' },
    { id: 'daily-briefing', title: 'Combine it into a daily briefing' },
    { id: 'schedule', title: 'Run it on a schedule' },
    { id: 'ship', title: 'Ship it to production' },
    { id: 'resources', title: 'Resources' }
  ],
  recording: {
    src: '/demos/build-a-personal-ai-assistant-with-eve.mp4',
    duration: 1870.44,
    // Timings read off the recording transcript.
    taps: [
      { stepId: 'showcase', t: 0 },
      { stepId: 'requirements', t: 45 },
      { stepId: 'primitives', t: 210 },
      { stepId: 'setup', t: 485 },
      { stepId: 'personality', t: 640 },
      { stepId: 'weather-tool', t: 708 },
      { stepId: 'news-tool', t: 774 },
      { stepId: 'morning-report', t: 840 },
      { stepId: 'slack', t: 945 },
      { stepId: 'notion', t: 1158 },
      { stepId: 'email-drafter', t: 1366 },
      { stepId: 'daily-briefing', t: 1516 },
      { stepId: 'schedule', t: 1759 },
      { stepId: 'ship', t: 1808 },
      { stepId: 'resources', t: 1861 }
    ]
  }
}

/** Shared step content, used by the build guide page and the demo playback view. */
export function DemoSteps() {
  return (
    <>
      <Step id="showcase" title="What you are building">
        <Description>
          By the end you have an agent that lives on Vercel and answers you in Slack. Ask it for
          a morning brief and it pulls the current weather and the latest headlines, reads your
          meeting notes out of Notion, works out what still needs a follow-up, and drafts those
          emails in your own tone and voice.
        </Description>
        <Description>
          The whole build takes 15 to 30 minutes, and you never have to write code yourself: a
          tool is one TypeScript file and a skill is a markdown file.
        </Description>
      </Step>

      <Step id="requirements" title="What you need before you start">
        <Description>
          Nothing here takes long to set up, and the free tiers are enough for the whole
          build. Grab the first three before you start; Slack, Notion, and Claude come in
          later on, once the agent is running.
        </Description>
        {/* Same list the guide's resources rail reads. */}
        <Requirements items={demoMeta.requirements ?? []} />
      </Step>

      <Step id="primitives" title="The primitives you get">
        <Description>
          Eve gives you seven core primitives: tools, skills, channels, sandboxes, sub-agents,
          connections, and schedules. This build uses five of them.
        </Description>
        <Description>
          <ul>
            <li>
              <strong>Tools</strong> are the hands of your agent. On its own an agent is just a
              model you talk to; a tool lets it do real things outside its training data, like
              fetching the weather or sending an email.
            </li>
            <li>
              <strong>Skills</strong> are its knowledge base: playbooks you hand it in plain
              markdown. If you can write down how you do something, it can be a skill.
            </li>
            <li>
              <strong>Channels</strong> are how you talk to it. One file per channel, and the
              same agent is reachable from wherever your team already works.
            </li>
            <li>
              <strong>Connections</strong> give it authenticated access to third-party services
              such as Notion.
            </li>
            <li>
              <strong>Schedules</strong> run it on a cron without anyone in the loop.
            </li>
          </ul>
        </Description>
        <Description>
          Worth knowing before the first command: a <strong>tool</strong> is one TypeScript
          file, a <strong>skill</strong> is a markdown file, and Eve finds both by their
          folder, so there is nothing to register. Everything below follows that pattern.
        </Description>
        <Description>
          <a
            href="https://docs.google.com/presentation/d/1mdbBlsWZH4YI1Tq8heCWlY0pM4PERJMA/edit"
            target="_blank"
            rel="noreferrer"
          >
            Slides for this section
          </a>
        </Description>
      </Step>

      <Step id="setup" title="Spin up the agent">
        <Description>
          Eve lives at{' '}
          <a href="https://vercel.com/eve" target="_blank" rel="noreferrer">
            vercel.com/eve
          </a>
          . Open your editor, then scaffold the project. This one command is the entire setup.
        </Description>
        <Command>{`npx eve@latest init alfred-robot`}</Command>
        <Description>
          Start the dev server with <code>eve dev</code> and it asks how you want to connect to a
          model provider. Choose AI Gateway: one connection gives you every provider and every
          model through a single key, so there are no separate dashboards to manage. Pick your
          Vercel team and create a new project, and Eve creates it in the dashboard and wires
          the key up for you.
        </Description>
        <Description>
          That is it. You have a working agent you can chat with in the terminal, and swapping
          models later is a one-line change in the config.
        </Description>
        <Description>
          Optionally teach your coding agent the framework so it can help you build:
        </Description>
        <Command>{`npx skills add vercel/eve --yes`}</Command>
      </Step>

      <Step id="personality" title="Give it a personality">
        <Description>
          <code>instructions.md</code> is the identity of your agent, and it is only markdown, so
          you could write <em>you are Alfred</em> and be done. Hand this to Cursor to fill it out
          properly:
        </Description>
        <Prompt tool="Cursor">{`lets write the instructions.md. the goal of this agent is to be an assistant named alfred like batman's personal assistant. it should be formal, british language, no em dashes, and be very proper.`}</Prompt>
        <Description>
          Chat with it again and the personality comes through immediately. It is a small thing,
          but it is the difference between a demo and something your team wants to use.
        </Description>
      </Step>

      <Step id="weather-tool" title="Add a weather tool">
        <Description>
          Capabilities go in a <code>tools/</code> folder. Add the folder and Eve already knows
          where to look, so there is nothing to register. Every assistant needs the weather, so
          start there.
        </Description>
        <Code lang="ts" filename="tools/get-weather.ts">{`import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description: "Get the current weather for a location.",
  inputSchema: z.object({ location: z.string() }),
  async execute({ location }) {
    const res = await fetch(\`https://wttr.in/\${location}?format=3\`);
    return await res.text();
  },
});`}</Code>
        <Description>
          That is a whole tool: a description, an input schema, and an <code>execute</code>{' '}
          function. Ask for the weather in New York City and you will see the tool call in the
          transcript before the answer comes back.
        </Description>
      </Step>

      <Step id="news-tool" title="Add a news tool">
        <Description>
          Same shape, no inputs this time. The description matters most here, because it is how
          the model works out that <em>get me the news</em> means this tool, so write it the way
          you would brief a person.
        </Description>
        <Code lang="ts" filename="tools/get-news.ts">{`import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description: "Get the 3 most recent BBC technology headlines and summaries.",
  inputSchema: z.object({}),
  async execute() {
    const res = await fetch("https://feeds.bbci.co.uk/news/technology/rss.xml");
    const xml = await res.text();
    const clean = (s: string | undefined) =>
      s?.replace(/<!\\[CDATA\\[|\\]\\]>/g, "").trim();
    return [...xml.matchAll(/<item>([\\s\\S]*?)<\\/item>/g)].slice(0, 3).map((m) => ({
      title: clean(m[1].match(/<title>([\\s\\S]*?)<\\/title>/)?.[1]),
      description: clean(m[1].match(/<description>([\\s\\S]*?)<\\/description>/)?.[1]),
    }));
  },
});`}</Code>
      </Step>

      <Step id="morning-report" title="Write the morning report skill">
        <Description>
          Skills are playbooks. Add a <code>skills/</code> folder and a markdown file per skill.
          The frontmatter description travels with every call so the model knows when to reach
          for it; the body is plain English that calls your tools in the order you want them.
        </Description>
        <Code lang="md" filename={eveSkills['morning-report'].file}>
          {eveSkills['morning-report'].source}
        </Code>
        <Description>
          Ask for your morning report and you can watch it load the skill, call the weather tool
          first because the playbook says so, then the news tool, then compose the report.
        </Description>
        <Description>
          This is where the leverage is: how you run your day, how you do sales outreach, how you
          research an account. Anything you can write down becomes a skill. There is also a
          growing public library at{' '}
          <a href="https://www.skills.sh/" target="_blank" rel="noreferrer">
            skills.sh
          </a>
          .
        </Description>
      </Step>

      <Step id="slack" title="Put the agent in Slack">
        <Description>
          Nobody wants to chat with an agent in a terminal. Run <code>/channels</code> inside
          your agent and choose Slack. A pop-up opens: pick your workspace, name the connector,
          and click connect.
        </Description>
        <Description>
          Accept the deploy-and-link step when it offers. Slack needs a deployed project to talk
          to, so Eve pushes the project to Vercel for you and links the two.
        </Description>
        <Description>
          In Slack, create a channel called <code>#alfred-bot</code>, private is fine, and invite
          the agent with <code>/invite</code>. Then just talk to it.
        </Description>
        <Prompt tool="Slack">{`@alfred-bot give me my morning report`}</Prompt>
        <Description>
          Same agent, same skills and tools, now answering in Slack. You also get an app you can
          DM directly, and you can add it to any other channel. Building this by hand used to
          take days.
        </Description>
      </Step>

      <Step id="notion" title="Connect Notion">
        <Description>
          Meeting notes are the interesting data, and ours live in Notion. Run{' '}
          <code>/connect</code>, choose Notion, and Eve writes the connection file for you.
        </Description>
        <Description>
          The connection is user-scoped, so the first call needs your authorization. Run any
          prompt that touches Notion and the agent hands you a link and a code:
        </Description>
        <Code lang="text" filename="Output">{`  notion · authorization · required
  Authorization required for notion
  URL: https://connect.vercel.com/authorize/sca_SzkaOPJfhZutm85NCInzYDTZFhbhxFsKfzz-R1WFSuc
  Code: BYZ-BNG
  Expires: 2026-07-24T14:08:10.416Z`}</Code>
        <Description>
          Open the URL in your browser, authorize, and click continue. Back in the agent, point
          it at a page and it can read your notes:
        </Description>
        <Prompt tool="your agent">{`Check this Notion page and summarise the call in one sentence: https://app.notion.com/p/vercel/AI-Gateway-Eve-Framework-Sync-with-Alfred-3a6e06b059c480a9b480e3d43b163954`}</Prompt>
      </Step>

      <Step id="email-drafter" title="Teach it your email voice">
        <Description>
          The most valuable skill in this build is not one you write from scratch. Have Claude
          study how you actually write and turn that into a skill:
        </Description>
        <Prompt tool="Claude">{eveSkills['email-reply-drafter'].prompt}</Prompt>
        <Description>
          Skills are just markdown, so copy the one it generates into your agent&apos;s{' '}
          <code>skills/</code> folder as <code>email-reply-drafter.md</code>. Ask for a reply and
          the draft comes back sounding like you rather than like a model.
        </Description>
      </Step>

      <Step id="daily-briefing" title="Combine it into a daily briefing">
        <Description>
          Now put every piece together in one skill: Notion for the meeting notes, the two tools
          for weather and news, and the email drafter for the follow-ups it finds.
        </Description>
        <Code lang="md" filename={eveSkills['daily-briefing'].file}>
          {eveSkills['daily-briefing'].source}
        </Code>
        <Description>
          Ask for your daily brief in Slack and you get the weather, the headlines, the day&apos;s
          outstanding follow-ups pulled from your notes, and a drafted email for each one.
        </Description>
      </Step>

      <Step id="schedule" title="Run it on a schedule">
        <Description>
          Schedules run the agent at a set time with nobody in the loop. Same pattern as
          everything else: a folder and a file, this time TypeScript. Grab the channel ID from
          Slack under channel details and drop it in.
        </Description>
        <Code lang="ts" filename="schedules/morning-report.ts">{`import { defineSchedule } from "eve/schedules";
import slack from "../channels/slack";

export default defineSchedule({
  cron: "0 12 * * *",
  async run({ receive, waitUntil, appAuth }) {
    waitUntil(
      receive(slack, {
        message:
          "Load and follow the morning_report skill. Prepare today's morning report from the weather and the news, and post it here.",
        target: { channelId: "C0BK8A0LHPX" },
        auth: appAuth,
      }),
    );
  },
});`}</Code>
        <Description>
          The cron runs in UTC, so <code>0 12 * * *</code> lands in the channel every morning
          Eastern time. Minutes, hours, whatever cadence you want.
        </Description>
      </Step>

      <Step id="ship" title="Ship it to production">
        <Description>
          Every time you add a tool, skill, schedule, or connection, push the change to your
          Vercel project so the hosted agent picks it up.
        </Description>
        <Command>{`vercel --prod`}</Command>
        <Description>
          The deployment builds and your agent has the new capabilities. Open the project in the
          Vercel dashboard and you can see the Slack channel and the Notion connection Eve
          configured along the way.
        </Description>
      </Step>

      <Step id="resources" title="Resources">
        <Description>
          The finished agent, ready to clone:{' '}
          <a
            href="https://github.com/williamarmstrong8/alfred-bot"
            target="_blank"
            rel="noreferrer"
          >
            github.com/williamarmstrong8/alfred-bot
          </a>
          .
        </Description>
        <Description>
          The Vercel project it deploys to:{' '}
          <a
            href="https://vercel.com/vercel-internal-playground/alfred-bot"
            target="_blank"
            rel="noreferrer"
          >
            vercel.com/vercel-internal-playground/alfred-bot
          </a>
          .
        </Description>
      </Step>
    </>
  )
}
