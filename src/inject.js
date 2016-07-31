/**
 * (c) 2015 Ruben Schmidmeister
 */

import cssData from '../data/css.json'

import { DataBackend } from './backends/data-backend'
import { Injector } from './injector'
import { createCssImport } from './helpers/create-css-import'

import { injectStyle } from './inject/inject-style'
import { injectFonts } from './inject/inject-fonts'
import { injectQuickJumpTo } from './inject/inject-quick-jump-to'
import { injectDownloadButton } from './inject/inject-download-button'
import { removeTargetBlank } from './inject/remove-target-blank'
import { removeRedundantNodes } from './inject/remove-redundant-nodes'
import { updateColor } from './inject/update-color'

// there's really not that much information on the home page
if (window.location.pathname === '/') {
  window.location.pathname = '/my'
}

let dataBackend = new DataBackend(chrome.runtime.connect())
let injector = new Injector()
let style = createCssImport(document, cssData.css)

dataBackend.on('color', (color) => updateColor(document, color))

dataBackend.pushGetColor()

injector.on('head', (head) => {
  console.log('We found the monsters\'s head!')

  injectStyle(head, style, injector)
  injectFonts(head)
})

injector.on('nodeAdded', removeRedundantNodes)

injector.on('domReady', () => {
  injectStyle(document.head, style, injector)
  injectQuickJumpTo(document)
  injectDownloadButton(document, dataBackend)
  removeTargetBlank(document)
})

injector.run(document)
