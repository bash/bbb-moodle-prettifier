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

  pushGetCss () {
    this._pushGet('css')
  }

  pushGetColor () {
    this._pushGet('color')
  }

  /**
   * @returns {Promise<String>}
   */
  getCSS () {
    return this._get('css')
  }

  /**
   *
   * @param {string} key
   * @returns {Promise}
   * @private
   */
  _get (key) {
    return new Promise((resolve) => {
      let listener = (value) => {
        this.off(key, listener)
        resolve(value)
      }

      this.on(key, listener)
      this._pushGet(key)
    })
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
    this.port.postMessage({ action: 'command', command: 'download', params: urls })
  }
}
