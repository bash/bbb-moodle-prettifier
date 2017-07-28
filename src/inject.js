/**
 * (c) 2015 Ruben Schmidmeister
 */

// import cssData from '../data/css.json'

import { DataBackend } from './backends/data-backend'

import { createCssImport } from './helpers/create-css-import'
import { injectStyle } from './inject/inject-style'
import { injectQuickJumpTo } from './inject/inject-quick-jump-to'
import { injectDownloadButton } from './inject/inject-download-button'
import { updateColor } from './inject/update-color'

// there's really not that much information on the home page
if (window.location.pathname === '/') {
  window.location.pathname = '/my'
}

const dataBackend = new DataBackend(chrome.runtime.connect())

dataBackend.on('color', (color) => updateColor(document, color))

dataBackend.requestCss()
dataBackend.pushGetColor()
dataBackend.showPageAction()

document.addEventListener('DOMContentLoaded', () => {
  injectQuickJumpTo(document)
  injectDownloadButton(document, dataBackend)
})

window.addEventListener('load', () => {
  // document.documentElement.style.opacity = 1
})
