/**
 * (c) 2015 Ruben Schmidmeister
 */

import { ensurePermissions } from '../helpers/ensure-permissions'

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

  ensurePermissions([ 'downloads' ])
    .then(() => {
      params.forEach((url) => chrome.downloads.download({ url: url }))
    })
    .catch(() => {
      console.error('user rejected download permissions')
    })
}
