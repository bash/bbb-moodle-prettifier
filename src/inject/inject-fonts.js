/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @type {string}
 */
const FONT_URL = 'https://fonts.googleapis.com/css?family=Raleway:400,500,600,700'

/**
 *
 * @param {HTMLHeadElement} head
 */
export function injectFonts (head) {
  let $font = document.createElement('link')

  $font.rel = 'stylesheet'
  $font.href = FONT_URL

  head.appendChild($font)
}
