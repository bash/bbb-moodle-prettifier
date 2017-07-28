/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @type {Array<Array>}
 */
const fontWeigthMap = [
  [ 100, 'thin' ],
  [ 200, 'extralight' ],
  [ 300, 'light' ],
  [ 400, 'regular' ],
  // [ 500, 'medium' ],
  [ 600, 'semibold' ],
  [ 700, 'bold' ],
  [ 800, 'extrabold' ],
  [ 900, 'heavy' ]
]

/**
 *
 * @type {string}
 */
const fontBasePath = chrome.extension.getURL('/fonts')

/**
 *
 * @param {number} weight
 * @param {string} name
 * @returns {string}
 */
const fontFaceTemplate = (weight, name) => {
  return `@font-face {
            font-family: 'Overpass';
            src: url('${fontBasePath}/overpass-${name}.woff2') format('woff2');
            font-weight: ${weight};
            font-style: normal;
          }`
}

/**
 *
 * @returns {string}
 */
export function generateFontsCss () {
  return fontWeigthMap
    .map((item) => fontFaceTemplate(...item))
    .join('')
}
