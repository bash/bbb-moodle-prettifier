/**
 * (c) 2015 Ruben Schmidmeister
 */

import { DataBackend } from './backends/data-backend'
import { Injector } from './injector'
import { injectStyle } from './inject/inject-style'
import { injectFonts } from './inject/inject-fonts'
import { injectQuickJumpTo } from './inject/inject-quick-jump-to'
import { removeRedundantNodes } from './inject/remove-redundant-nodes'
import { injectDownloadButton } from './inject/inject-download-button'
import { createCssBlob } from './inject/create-css-blob'

import cssData from '../data/css.json'

let dataBackend = new DataBackend(chrome.runtime.connect())
let injector = new Injector()

// todo: prepare css
let style = document.createElement('link')
style.rel = 'stylesheet'
style.href = createCssBlob(cssData.css)

dataBackend.on('color', (color) => {
  let root = document.documentElement

  // todo: clean this up

  root.style.removeProperty('--mdl-user-color')
  root.style.setProperty('--mdl-user-color', color, '')
})

dataBackend.pushGetColor()

injector.on('head', (head) => {
  console.log("We found the monsters's head!")

  injectStyle(head, style, injector)
  injectFonts(head)
})

injector.on('nodeAdded', removeRedundantNodes)

injector.on('domReady', () => {
  injectStyle(document.head, style, injector)
  injectQuickJumpTo(document)
  injectDownloadButton(document, dataBackend)

  // todo: clean this up
  Array.from(document.querySelectorAll('.linkbox a'))
    .filter(($a) => $a.target === '_blank')
    .forEach(($a) => $a.removeAttribute('target'))
})

injector.run(document)
