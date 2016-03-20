/**
 * (c) 2015 Ruben Schmidmeister
 */

import { getCSS } from '../css/get-css'
import { defaultColor } from '../value/color'

/**
 *
 * @param {string} key
 * @param {StorageCache} storage
 * @param {Map} runtimeStorage
 * @param {MessageBackend} messageBackend
 */
export function handleGet (key, storage, runtimeStorage, messageBackend) {
  if (key === 'css') {
    return getCSS(storage, runtimeStorage)
      .then((css) => messageBackend.pushCSS(css))
  }

  if (key === 'color') {
    return storage.get('color', defaultColor.toString())
      .then((color) => messageBackend.pushColor(color))
  }
}
