/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {string} command
 * @param {Array<string>} params
 * @param {StorageCache} storage
 * @param {Map} runtimeStorage
 * @param {MessageBackend} messageBackend
 */
export function handleCommand (command, params, storage, runtimeStorage, messageBackend) {
  if (command !== 'download') {
    return
  }

  params.forEach((url) => chrome.downloads.download({ url: url }))
}
