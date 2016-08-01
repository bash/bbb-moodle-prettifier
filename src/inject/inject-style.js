/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {HTMLHeadElement} head
 * @param {HTMLStyleElement} style
 */
export function injectStyle (head, style) {
  const appendChild = () => head.appendChild(style)

  appendChild()

  document.addEventListener('DOMContentLoaded', appendChild, { once: true })
}
