/**
 * (c) 2015 Ruben Schmidmeister
 */

import { DataBackend } from './backends/data-backend'
import { Injector } from './injector'
import { injectStyle } from './inject/inject-style'
import { injectQuickJumpTo } from './inject/inject-quick-jump-to'
import { removeRedundantNodes } from './inject/remove-redundant-nodes'
import { injectDownloadButton } from './inject/inject-download-button'

(function () {
  let injector, style, domReady

  let dataBackend = new DataBackend(chrome.runtime.connect())

  injector = new Injector()
  style = document.createElement('style')
  domReady = false

  // register event handlers
  dataBackend.on('css', (css) => {
    if (!domReady) {
      style.innerHTML = css
      return
    }

    let newStyle = document.createElement('style')
    newStyle.innerHTML = css

    if (style.parentNode) {
      style.parentNode.appendChild(newStyle)
      style.parentNode.removeChild(style)
    }

    style = newStyle
  })

  dataBackend.pushGetCss()

  injector.on('head', (head) => {
    console.log("We found the monsters's head!")

    injectStyle(head, style, injector)
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
})()
