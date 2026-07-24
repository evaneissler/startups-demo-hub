# Nextra Demo Site

A documentation website built with [Nextra 4](https://nextra.site) and the
[Nextra Docs theme](https://nextra.site/docs/docs-theme/start), using the Next.js
App Router and the `content` directory convention.

## Features

- Top navigation bar, sidebar, and table of contents
- Full-text search (Pagefind)
- Light & dark mode
- MDX pages with built-in components

## Getting started

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```sh
npm run build
npm run start
```

The `postbuild` script runs Pagefind to generate the search index after the
build completes.

## Project structure

```text
.
├── app/
│   ├── layout.jsx            # Root layout — configures the theme
│   └── [[...mdxPath]]/
│       └── page.jsx          # Catch-all route into the content directory
├── content/                  # Markdown/MDX pages
│   ├── _meta.js
│   ├── index.mdx
│   ├── getting-started.mdx
│   ├── about.mdx
│   └── guides/
│       ├── _meta.js
│       ├── installation.mdx
│       ├── configuration.mdx
│       └── writing-content.mdx
├── mdx-components.jsx
├── next.config.mjs
└── package.json
```
# startups-demo-hub
