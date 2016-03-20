/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {HTMLDocument} document
 * @returns {Array<string>}
 */
function getDownloadLinks (document) {
  return Array.from(document.querySelectorAll('a'))
    .filter(($) => $.pathname === '/mod/resource/view.php')
    .filter(($) => $.textContent.match(/(lösung)|(_l)|(\-l)/i))
    .map(($) => $.href)
}

/**
 *
 * @param {HTMLDocument} document
 * @param {DataBackend} dataBackend
 */
export function injectDownloadButton (document, dataBackend) {
  if (window.location.pathname !== '/course/view.php') {
    return
  }

  let $content = document.querySelector('.course-content')
  let $button = document.createElement('button')

  $button.innerText = 'Download Solution Files'
  $button.className = '-no-inline'

  $button.addEventListener('click', () => {
    dataBackend.download(getDownloadLinks(document))
  })

  $content.insertBefore($button, $content.firstChild)
}
