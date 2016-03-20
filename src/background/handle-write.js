/**
 * (c) 2015 Ruben Schmidmeister
 */

import { getCSS } from '../css/get-css'

/**
 *
 * @param {string} key
 * @param {*} value
 * @param {StorageCache} storage
 * @param {Map} runtimeStorage
 * @param {MessageBackend} messageBackend
 */
export function handleWrite (key, value, storage, runtimeStorage, messageBackend) {
  if (key === 'color') {
    storage.set('color', value)
    runtimeStorage.delete('css')

    return getCSS(storage, runtimeStorage).then((css) => messageBackend.pushCSS(css))
  }
}
