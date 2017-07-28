/**
 * (c) 2015 Ruben Schmidmeister
 */

import { defaultColor } from '../value/color'

/**
 *
 * @param {string} key
 * @param {StorageCache} storage
 * @param {MessageBackend} messageBackend
 */
export function handleGet (key, storage, messageBackend) {
  if (key === 'color') {
    return storage
      .get('color', defaultColor.toString())
      .then((color) => messageBackend.pushColor(color))
  }
}
