/**
 * (c) 2015 Ruben Schmidmeister
 */

import { parseUrl } from '../utilities/parse-url'

/**
 *
 * @param {number} tabId
 * @param {chrome.tabs.TabChangeInfo} changeInfo
 * @param {chrome.tabs.Tab} tab
 */
export function showHidePageAction (tabId, changeInfo, tab) {
  let url = parseUrl(tab.url)

  console.log(tab)
  
  if (url.host === 'moodle.bbbaden.ch' || url.host === 'moodle-stage.bbbaden.ch') {
    console.log('showing page action')
    chrome.pageAction.show(tab.id)
  }
}
