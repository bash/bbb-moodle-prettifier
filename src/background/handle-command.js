/**
 * (c) 2015 Ruben Schmidmeister
 */

import { ensurePermissions } from '../helpers/ensure-permissions'

/**
 *
 * @param {Array<string>} params
 */
function handleDownload (params) {
  params.forEach((url) => chrome.downloads.download({ url: url }))
  /*ensurePermissions([ 'downloads' ])
    .then(() => {
      params.forEach((url) => chrome.downloads.download({ url: url }))
    })
    .catch(() => {
      console.error('user rejected download permissions')
    })*/
}

/**
 *
 * @param {{}} msg
 * @param {chrome.runtime.Port} port
 * @param {StorageCache} storage
 * @param {Map} runtimeStorage
 * @param {MessageBackend} messageBackend
 */
export function handleCommand ({ msg, port }, storage, runtimeStorage, messageBackend) {
  switch (msg.command) {
    case 'download':
      return handleDownload(msg.params)
    case 'showPageAction':
      return chrome.pageAction.show(port.sender.tab.id)
  }
}
