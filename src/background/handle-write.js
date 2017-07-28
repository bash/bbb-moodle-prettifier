/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {string} key
 * @param {*} value
 * @param {StorageCache} storage
 * @param {MessageBackend} messageBackend
 */
export function handleWrite (key, value, storage, messageBackend) {
  if (key === 'color') {
    storage.set('color', value)
    messageBackend.pushColor(value)
  }
}
