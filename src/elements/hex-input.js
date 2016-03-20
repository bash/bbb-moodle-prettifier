/**
 * (c) 2016 Ruben Schmidmeister
 */

import { Color } from '../value/color'
import { wrapElement } from '../helpers/wrap-element'

class _HexInput extends HTMLInputElement {
  // noinspection JSUnusedGlobalSymbols
  createdCallback () {
    this.dataBackend.on('color', (color) => {
      if (this.value === color) {
        return
      }

      this.value = color
    })

    this.addEventListener('input', () => {
      if (!Color.isValid(this.value)) {
        return
      }

      this.dataBackend.setColor(this.value)
    })
  }
}

/**
 *
 * @param {DataBackend} dataBackend
 * @returns {_HexInput}
 * @constructor
 */
export function HexInput (dataBackend) {
  let Element = wrapElement(_HexInput, dataBackend)

  Element.extends = 'input'

  return Element
}
