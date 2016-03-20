/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {string} css
 * @returns {string}
 */
export function createCssBlob (css) {
  let blob = new Blob([ css ], { type: 'text/css' })

  return URL.createObjectURL(blob)
}
