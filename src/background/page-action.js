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

  if (url.host === 'moodle.bbbaden.ch') {
    chrome.pageAction.show(tab.id)
  }
}
