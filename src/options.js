/**
 * (c) 2016 Ruben Schmidmeister
 */

import { DataBackend } from './backends/data-backend'
import { ColorPick } from './elements/color-pick'
import { ColorPreview } from './elements/color-preview'
import { HexInput } from './elements/hex-input'

import { updateColor } from './inject/update-color'
import { injectFonts } from './inject/inject-fonts'

let dataBackend = new DataBackend(chrome.runtime.connect())

dataBackend.on('color', (color) => updateColor(document, color))

document.registerElement('color-pick', ColorPick(dataBackend))
document.registerElement('color-preview', ColorPreview(dataBackend))
document.registerElement('hex-input', HexInput(dataBackend))

document.addEventListener('DOMContentLoaded', () => {
  dataBackend.pushGetColor()
  injectFonts(document.head)
})
