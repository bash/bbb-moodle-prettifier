/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @type {Symbol}
 */
const cache = Symbol('cache')

/**
 *
 * @type {Symbol}
 */
const storage = Symbol('storage')

export class StorageCache {
  /**
   *
   * @param {chrome.storage.StorageArea} storageArea
   */
  constructor (storageArea) {
    /**
     *
     * @type {Map}
     */
    this[ cache ] = new Map()

    /**
     *
     * @type {chrome.storage.StorageArea}
     */
    this[ storage ] = storageArea
  }

  /**
   *
   * @param {string} key
   * @param {*} [defaultValue]
   * @returns {Promise}
   */
  get (key, defaultValue) {
    if (this[ cache ].has(key)) {
      return Promise.resolve(this[ cache ].get(key))
    }

    return new Promise((resolve) => {
      this[ storage ].get({ [key]: defaultValue }, (data) => {
        let value = data[ key ]

        this[ cache ].set(key, value)
        resolve(value)
      })
    })
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   */
  set (key, value) {
    this[ cache ].set(key, value)
    this[ storage ].set({ [key]: value })
  }
}
