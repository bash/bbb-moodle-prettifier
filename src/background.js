/**
 * (c) 2015 Ruben Schmidmeister
 */

import { showHidePageAction } from './background/page-action'
import { handleGet } from './background/handle-get'
import { handleWrite } from './background/handle-write'
import { handleCommand } from './background/handle-command'
import { MessageBackend } from './backends/message-backend'
import { StorageCache } from './storage-cache'

import helpers from './background/helpers'

const messageBackend = new MessageBackend()
const storage = new StorageCache(chrome.storage.local)
const runtimeStorage = new Map()

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  showHidePageAction(tabId, changeInfo, tab)
})

chrome.runtime.onConnect.addListener((port) => {
  messageBackend.addPort(port)
})

messageBackend.on('message', (msg) => {
  switch (msg.action) {
    case 'get':
      return handleGet(msg.key, storage, runtimeStorage, messageBackend)
    case 'write':
      return handleWrite(msg.key, msg.value, storage, runtimeStorage, messageBackend)
    case 'command':
      return handleCommand(msg.command, msg.params, storage, runtimeStorage, messageBackend)
  }

  console.warn('invalid message action', msg)
})

window.$mdl = helpers(storage, runtimeStorage, messageBackend)
