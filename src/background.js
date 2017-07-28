/**
 * (c) 2015 Ruben Schmidmeister
 */

import { handleGet } from './background/handle-get'
import { handleWrite } from './background/handle-write'
import { MessageBackend } from './backends/message-backend'
import { StorageCache } from './storage-cache'
import { injectCss } from './background/inject'
import { handleDownload } from './background/download'

import helpers from './background/helpers'

const messageBackend = new MessageBackend()
const storage = new StorageCache(chrome.storage.local)

chrome.runtime.onConnect.addListener((port) => {
  messageBackend.addPort(port)
})

messageBackend.on('message', ({ msg, port }) => {
  switch (msg.action) {
    case 'get':
      return handleGet(msg.key, storage, messageBackend)
    case 'write':
      return handleWrite(msg.key, msg.value, storage, messageBackend)
    case 'requestCss':
      return injectCss({ port })
    case 'showPageAction':
      return chrome.pageAction.show(port.sender.tab.id)
    case 'download':
      return handleDownload(msg)
  }

  console.warn('invalid message action', msg)
})

window.$mdl = helpers(storage, messageBackend)
