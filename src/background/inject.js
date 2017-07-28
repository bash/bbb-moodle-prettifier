/**
 * (c) 2017 Ruben Schmidmeister
 */

import cssData from '../../data/css.json'
import { generateFontsCss } from '../utilities/fonts'

export function injectCss ({ port }) {
  const tabId = port.sender.tab.id

  chrome.tabs.insertCSS(tabId, {
    code: cssData.css,
    runAt: 'document_start'
  }, (...args) => {
    console.log(args)
  })

  chrome.tabs.insertCSS(tabId, {
    code: generateFontsCss(),
    runAt: 'document_start'
  }, (...args) => {
    console.log(args)
  })
}
