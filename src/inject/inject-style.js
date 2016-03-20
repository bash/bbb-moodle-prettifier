/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @type {string}
 */
const ROBOTO_URL = 'https://fonts.googleapis.com/css?family=Roboto:400,700,300,100'

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

  let $roboto = document.createElement('link')

  $roboto.rel = 'stylesheet'
  $roboto.href = ROBOTO_URL

  head.appendChild($roboto)
}
