/**
 * (c) 2015 Ruben Schmidmeister
 */

import { wrapFunction } from '../utilities/wrap-function'
import { handleWrite } from '../background/handle-write'

/**
 *
 * @param {StorageCache} storage
 * @param {MessageBackend} messageBackend
 * @param {string} key
 * @param {string} value
 */
function write (storage, messageBackend, key, value) {
  handleWrite(key, value, storage, messageBackend)
}

/**
 *
 * @param {StorageCache} storage
 * @param {MessageBackend} messageBackend
 */
export default function (storage, messageBackend) {
  return {
    write: wrapFunction(write, storage, messageBackend)
  }
}
