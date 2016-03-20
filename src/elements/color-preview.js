/**
 * (c) 2016 Ruben Schmidmeister
 */

import { wrapElement } from '../helpers/wrap-element'

class _ColorPreview extends HTMLElement {
  createdCallback () {
    this.dataBackend.on('color', (color) => {
      this.querySelector('.color').style.color = color
    })
  }
}

/**
 *
 * @param {DataBackend} dataBackend
 * @returns {_ColorPreview}
 * @constructor
 */
export function ColorPreview (dataBackend) {
  return wrapElement(_ColorPreview, dataBackend)
}
