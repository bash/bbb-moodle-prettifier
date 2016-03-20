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
  function appendStyle () {
    head.appendChild(style)
  }

  let observer = new MutationObserver(appendStyle)
  observer.observe(head, { childList: true })

  appendStyle()

  injector.on('domReady', () => observer.disconnect())
}
