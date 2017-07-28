/**
 * (c) 2017 Ruben Schmidmeister
 */

/**
 *
 * @param {Array<string>} urls
 */
export function handleDownload ({ urls }) {
  urls.forEach(({ url, filename }) => {
    console.log('downloading', { url, filename })
    chrome.downloads.download({ url, filename })
  })
}
