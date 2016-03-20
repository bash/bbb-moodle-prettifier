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
 */
export function injectFonts (head) {
  let $roboto = document.createElement('link')

  $roboto.rel = 'stylesheet'
  $roboto.href = ROBOTO_URL

  head.appendChild($roboto)
}