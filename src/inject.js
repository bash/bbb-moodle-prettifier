/**
 * (c) 2015 Ruben Schmidmeister
 */

import { DataBackend } from './backends/data-backend'
import { Injector } from './injector'
import { injectStyle } from './inject/inject-style'
import { injectFonts } from './inject/inject-fonts'
import { injectQuickJumpTo } from './inject/inject-quick-jump-to'
import { removeRedundantNodes } from './inject/remove-redundant-nodes'
import { handleStyleUpdate } from './inject/handle-style-update'
import { injectDownloadButton } from './inject/inject-download-button'

let dataBackend = new DataBackend(chrome.runtime.connect())
let injector = new Injector()
let style = document.createElement('link')
style.rel = 'stylesheet'

let domReady = false

dataBackend.on('css', (css) => {
  style = handleStyleUpdate(style, css, domReady)
})

dataBackend.pushGetCss()

injector.on('head', (head) => {
  console.log("We found the monsters's head!")

  injectStyle(head, style, injector)
  injectFonts(head)
})

injector.on('nodeAdded', removeRedundantNodes)

injector.on('domReady', () => {
  domReady = true

  injectStyle(document.head, style, injector)
  injectQuickJumpTo(document)
  injectDownloadButton(document, dataBackend)

  Array.from(document.querySelectorAll('.linkbox a'))
    .filter(($a) => $a.target === '_blank')
    .forEach(($a) => $a.removeAttribute('target'))
})

injector.run(document)
