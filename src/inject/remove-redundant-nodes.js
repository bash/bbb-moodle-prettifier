/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @type {Set}
 */
const IDS = new Set([ 'sliderarea', 'footer', 'footerend' ])

/**
 *
 * @param {Node} node
 */
export function removeRedundantNodes (node) {
  if (node.id && IDS.has(node.id)) {
    node.parentNode.removeChild(node)
  }
}
