/* The hub is the home page, so it needs no navbar link of its own; `skills` is a
 * `page` item, which puts it in the navbar left of the search box and scopes the
 * sidebar to its own tree while you are inside it.
 *
 * `display: 'children'` on `g` hoists the guides to the top of the sidebar tree
 * so there is no "Build Guides" folder row above them. */
export default {
  index: {
    display: 'hidden',
    theme: {
      layout: 'full',
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
      timestamp: false
    }
  },
  skills: {
    title: 'Skills',
    type: 'page',
    theme: {
      // The sidebar carries the skill tree, so the right rail and the footer
      // navigation have nothing useful to add.
      toc: false,
      pagination: false,
      timestamp: false
    }
  },
  g: {
    title: 'Build Guides',
    display: 'children'
  }
}
