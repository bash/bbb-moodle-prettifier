/**
 * (c) 2015 Ruben Schmidmeister
 */

import { Emitter } from '../emitter'

export class MessageBackend extends Emitter {
  constructor () {
    super()

    /**
     *
     * @type {Set<chrome.runtime.Port>}
     */
    this.ports = new Set()
  }

  /**
   *
   * @param {chrome.runtime.Port} port
   */
  addPort (port) {
    this.ports.add(port)

    port.onDisconnect.addListener(() => {
      this.ports.delete(port)
    })

    port.onMessage.addListener((msg) => {
      this.emit('message', { msg, port })
    })
  }

  /**
   *
   * @param {string} color
   */
  pushColor (color) {
    this.push('color', color)
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   */
  push (key, value) {
    this.postMessage({ action: 'push', key: key, value: value })
  }

  /**
   *
   * @param {{}} msg
   */
  postMessage (msg) {
    this.ports.forEach((port) => port.postMessage(msg))
  }
}
