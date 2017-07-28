/**
 * (c) 2015 Ruben Schmidmeister
 */

import { Emitter } from '../emitter'

/**
 *
 * @param {chrome.Port} port
 * @param {DataBackend} backend
 */
function setupPortListeners (port, backend) {
  port.onMessage.addListener((message) => {
    backend.emit('message', message)

    if (message.action !== 'push') {
      return
    }

    backend.emit('push', message)
    backend.emit(message.key, message.value)
  })
}

export class DataBackend extends Emitter {
  /**
   * @param {chrome.runtime.Port} port
   */
  constructor (port) {
    super()

    /**
     *
     * @type {chrome.Port}
     */
    this.port = port

    setupPortListeners(this.port, this)
  }

  /**
   *
   * @param {string} color
   */
  setColor (color) {
    this.port.postMessage({ action: 'write', key: 'color', value: color })
  }

  pushGetColor () {
    this._pushGet('color')
  }

  showPageAction () {
    this.port.postMessage({ action: 'showPageAction' })
  }

  requestCss () {
    this.port.postMessage({ action: 'requestCss' })
  }

  /**
   *
   * @param {string} key
   * @private
   */
  _pushGet (key) {
    this.port.postMessage({ action: 'get', key: key })
  }

  /**
   *
   * @param {Array<string>} urls
   */
  download (urls) {
    this.port.postMessage({ action: 'download', urls })
  }
}
