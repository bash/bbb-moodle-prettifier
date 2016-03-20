/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {HTMLHeadElement} head
 * @param {HTMLStyleElement} style
 * @param {Injector} injector
 */
export function injectStyle (head, style, injector) {
  const appendStyle = () => head.appendChild(style)
  const observer = new MutationObserver(appendStyle)

  // noinspection JSCheckFunctionSignatures
  observer.observe(head, { childList: true })

  appendStyle()

  injector.on('domReady', () => observer.disconnect())
}
