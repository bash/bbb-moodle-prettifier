/**
 * (c) 2015 Ruben Schmidmeister
 */

import { fetch } from '../utilities/fetch'

/**
 *
 * @param {string} css
 * @param {{}} options
 * @returns {Promise<string>}
 */
function renderLess (css, options) {
  return new Promise((resolve, reject) => {
    less.render(css, options, (error, output) => {
      if (error) {
        return reject(error)
      }

      resolve(output.css)
    })
  })
}

/**
 *
 * @param {string} file
 * @param {string} color
 * @returns {Promise<string>}
 */
export function compileCSS (file, color) {
  let options = {
    filename: file,
    globalVars: {
      'color-main': color
    },
    compress: true
  }

  return fetch(file).then((css) => renderLess(css, options))
}
