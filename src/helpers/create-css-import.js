/**
 * (c) 2015 Ruben Schmidmeister
 */

import { createCssBlob } from './create-css-blob'

/**
 *
 * @param {HTMLDocument} document
 * @param {string} css
 * @returns {HTMLLinkElement}
 */
export function createCssImport (document, css) {
  let $link = document.createElement('link')

  $link.href = createCssBlob(css)
  $link.rel = 'stylesheet'

  return $link
}