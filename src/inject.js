/**
 * (c) 2015 Ruben Schmidmeister
 */

import cssData from '../data/css.json'

import Color from 'color-js'
import { DataBackend } from './backends/data-backend'
import { Injector } from './injector'
import { createCssImport } from './helpers/create-css-import'

import { injectStyle } from './inject/inject-style'
import { injectFonts } from './inject/inject-fonts'
import { injectQuickJumpTo } from './inject/inject-quick-jump-to'
import { injectDownloadButton } from './inject/inject-download-button'
import { removeTargetBlank } from './inject/remove-target-blank'
import { removeRedundantNodes } from './inject/remove-redundant-nodes'

let dataBackend = new DataBackend(chrome.runtime.connect())
let injector = new Injector()
let style = createCssImport(document, cssData.css)

dataBackend.on('color', (color) => {
  let root = document.documentElement

  let updateProperty = (prop, value) => {
    root.style.removeProperty(prop)
    root.style.setProperty(prop, value, '')
  }

  color = Color(color)

  updateProperty('--mdl-user-color', color)
  updateProperty('--mdl-user-color-darker-10', color.darkenByAmount(0.1))
  updateProperty('--mdl-user-color-darker-20', color.darkenByAmount(0.2))
  updateProperty('--mdl-user-color-darker-30', color.darkenByAmount(0.3))
  updateProperty('--mdl-user-color-lighter-10', color.lightenByAmount(0.1))
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
  removeTargetBlank(document)
})

injector.run(document)
