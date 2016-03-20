/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @returns {string}
 */
export function getCSSFile () {
  return chrome.extension.getURL('less/main.less')
}
