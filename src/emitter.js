/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

/**
 *
 * @type {Symbol}
 */
const events = Symbol('events')

export class Emitter {
  constructor () {
    /**
     *
     * @type {Map}
     */
    this[ events ] = new Map()
  }

  /**
   *
   * @param {string} name
   * @param {Function} callbackFn
   */
  on (name, callbackFn) {
    let listeners = this[ events ].get(name)

    if (!listeners) {
      listeners = new Set()
      this[ events ].set(name, listeners)
    }

    listeners.add(callbackFn)
  }

  /**
   *
   * @param {string} name
   * @param {Function} callbackFn
   */
  off (name, callbackFn) {
    if (!this[ events ].get(name)) {
      return
    }

    this[ events ].get(name).delete(callbackFn)
  }

  /**
   *
   * @param {string} name
   * @param {{}} [data]
   */
  emit (name, data) {
    if (!this[ events ].get(name)) {
      return
    }

    this[ events ].get(name).forEach((fn) => fn(data))
  }
}
