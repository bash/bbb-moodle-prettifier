/**
 * (c) 2015 Ruben Schmidmeister
 */

import cssData from '../data/css.json'

import { DataBackend } from './backends/data-backend'

import { createCssImport } from './helpers/create-css-import'
import { awaitHead } from './helpers/await-head'
import { injectStyle } from './inject/inject-style'
import { injectFonts } from './inject/inject-fonts'
import { injectQuickJumpTo } from './inject/inject-quick-jump-to'
import { injectDownloadButton } from './inject/inject-download-button'
import { updateColor } from './inject/update-color'

let dataBackend = new DataBackend(chrome.runtime.connect())
let style = createCssImport(document, cssData.css)

dataBackend.on('color', (color) => updateColor(document, color))

dataBackend.pushGetColor()
dataBackend.showPageAction()

awaitHead()
  .then(() => {
    console.log('We found the monsters\'s head!')

    injectStyle(document.head, style)
    injectFonts(document.head)
  })

document.addEventListener('DOMContentLoaded', () => {
  injectQuickJumpTo(document)
  injectDownloadButton(document, dataBackend)
})
