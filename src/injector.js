/**
 * (c) 2015 Ruben Schmidmeister
 */

import { Emitter } from './emitter'

export class Injector extends Emitter {
  constructor () {
    super()

    /**
     *
     * @type {MutationObserver}
     */
    this.observer = new MutationObserver((records) => {
      records.forEach((record) => {
        Array.from(record.addedNodes).forEach((node) => {
          this.emit('nodeAdded', node)

          if (node instanceof HTMLHeadElement) {
            this.emit('head', node)
          }
        })
      })
    })

    window.addEventListener('load', () => {
      this.observer.disconnect()
      this.emit('load')
    })
  }

  /**
   *
   * @param {HTMLDocument} document
   */
  run (document) {
    document.addEventListener('DOMContentLoaded', () => {
      this.emit('domReady', document)
      this.observer.disconnect()
    })

    // noinspection JSCheckFunctionSignatures
    this.observer.observe(document, { childList: true, subtree: true })
  }
}
