/* One folder per demo, so each skill nests under the build it came from. The
 * folder is named for the build rather than by its slug: guides live at the root
 * of the content tree, and the sidebar keys its items by name, so a folder named
 * after a guide would collide with it.
 *
 * Guides sit at the root of the content tree, so they follow this section in the
 * sidebar. The trailing separator labels them; it belongs to this folder, which
 * is why it only appears while you are inside /skills. */
export default {
  index: 'Overview',
  'eve-assistant': 'Personal AI assistant with Eve',
  '---guides': {
    type: 'separator',
    title: 'Build guides'
  }
}
