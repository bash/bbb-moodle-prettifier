/**
 * (c) 2015 Ruben Schmidmeister
 */

import { wrapFunction } from '../utilities/wrap-function'
import { handleWrite } from '../background/handle-write'

/**
 *
 * @param {chrome.storage.StorageArea} storage
 * @param {Map} runtimeStorage
 * @param {MessageBackend} messageBackend
 * @param {string} key
 * @param {string} value
 */
function write (storage, runtimeStorage, messageBackend, key, value) {
  handleWrite(key, value, storage, runtimeStorage, messageBackend)
}

/**
 *
 * @param {chrome.storage.StorageArea} storage
 * @param {Map} runtimeStorage
 * @param {MessageBackend} messageBackend
 */
export default function (storage, runtimeStorage, messageBackend) {
  return {
    write: wrapFunction(write, storage, runtimeStorage, messageBackend)
  }
}
