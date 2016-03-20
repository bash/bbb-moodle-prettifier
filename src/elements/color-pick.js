/**
 * (c) 2016 Ruben Schmidmeister
 */

import { wrapElement } from '../helpers/wrap-element'

class _ColorPick extends HTMLElement {
  // noinspection JSUnusedGlobalSymbols
  createdCallback () {
    let $template = this.ownerDocument.querySelector('template#color-pick')
    this.appendChild(document.importNode($template.content, true))

    let $pick = this.querySelector('.pick')

    $pick.style.color = this.color
    $pick.addEventListener('click', () => this.dataBackend.setColor(this.color))

    this.querySelector('label').innerText = this.label

    this.dataBackend.on('color', (color) => {
      this.active = (this.color === color)
    })
  }

  /**
   *
   * @param {boolean} active
   */
  set active (active) {
    var $color = this.querySelector('.color')

    if (active) {
      $color.classList.add('active')
    } else {
      $color.classList.remove('active')
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
