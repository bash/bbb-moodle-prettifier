/**
 * (c) 2016 Ruben Schmidmeister
 */

import { wrapElement } from '../helpers/wrap-element'

class _ColorPick extends HTMLElement {
  createdCallback () {
    let $template = this.ownerDocument.querySelector('template#color-pick')
    this.appendChild(document.importNode($template.content, true))

    let $color = this.querySelector('.color')

    $color.style.color = this.color
    $color.addEventListener('click', () => this.dataBackend.setColor(this.color))

    this.querySelector('.label').innerText = this.label

    this.dataBackend.on('color', (color) => {
      this.active = (this.color === color)
    })
  }

  /**
   *
   * @param {boolean} active
   */
  set active (active) {
    var $color = this.querySelector('.color-pick')

    if (active) {
      $color.classList.add('-active')
    } else {
      $color.classList.remove('-active')
    }
  }

  /**
   *
   * @returns {string}
   */
  get color () {
    return this.getAttribute('color')
  }

  /**
   *
   * @returns {string}
   */
  get label () {
    return this.getAttribute('label')
  }
}

/**
 *
 * @param {DataBackend} dataBackend
 * @returns {_ColorPick}
 * @constructor
 */
export function ColorPick (dataBackend) {
  return wrapElement(_ColorPick, dataBackend)
}
