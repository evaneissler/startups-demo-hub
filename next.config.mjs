import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({
  // Add Nextra-specific options here
  // See https://nextra.site/docs/guide for all options
})

// Export the final Next.js config with Nextra included
export default withNextra({
  // Add regular Next.js options here
  reactStrictMode: true,
  turbopack: {
    // Pin the workspace root to this project to avoid multiple-lockfile warnings
    root: import.meta.dirname
  }
})
