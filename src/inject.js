/**
 * (c) 2015 Ruben Schmidmeister
 */

import cssData from '../data/css.json'

import { DataBackend } from './backends/data-backend'

import { createCssImport } from './helpers/create-css-import'
import { awaitBody } from './helpers/await-body'
import { injectStyle } from './inject/inject-style'
import { injectFonts } from './inject/inject-fonts'
import { injectQuickJumpTo } from './inject/inject-quick-jump-to'
import { injectDownloadButton } from './inject/inject-download-button'
import { updateColor } from './inject/update-color'

// there's really not that much information on the home page
if (window.location.pathname === '/') {
  window.location.pathname = '/my'
}

document.documentElement.style.opacity = 0

let dataBackend = new DataBackend(chrome.runtime.connect())
let style = createCssImport(document, cssData.css)

dataBackend.on('color', (color) => updateColor(document, color))

dataBackend.pushGetColor()
dataBackend.showPageAction()

awaitBody()
  .then(() => {
    console.log('We found the monsters\'s head!')

    injectStyle(document.body, style)
    injectFonts(document.body)
  })

document.addEventListener('DOMContentLoaded', () => {
  injectQuickJumpTo(document)
  injectDownloadButton(document, dataBackend)

  document.documentElement.style.opacity = 1
})
