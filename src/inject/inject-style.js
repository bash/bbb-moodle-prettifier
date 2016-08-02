/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {HTMLElement} body
 * @param {HTMLStyleElement} style
 */
export function injectStyle (body, style) {
  const appendChild = () => body.appendChild(style)

  appendChild()

  document.addEventListener('DOMContentLoaded', appendChild, { once: true })
}
