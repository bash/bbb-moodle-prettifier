/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {Array<string>} params
 */
function handleDownload (params) {
  params.forEach((url) => chrome.downloads.download({ url: url }))
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
