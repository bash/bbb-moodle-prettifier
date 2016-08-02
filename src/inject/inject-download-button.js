/**
 * (c) 2015 Ruben Schmidmeister
 */

const solutionFilesFilter = ($) => $.textContent.match(/(lösung)|(_l)|(\-l)/i)
const allFilesFilter = () => true

/**
 *
 * @param {HTMLDocument} document
 * @param {Function} filterFn
 * @returns {Array<string>}
 */
function getDownloadLinks (document, filterFn) {
  return Array.from(document.querySelectorAll('a'))
    .filter(($) => $.pathname === '/mod/resource/view.php')
    .filter(filterFn)
    .map(($) => $.href)
}

/**
 *
 * @param {HTMLDocument} document
 * @param {DataBackend} dataBackend
 * @param {string}  label
 * @param {Function} filterFn
 * @returns {HTMLButtonElement}
 */
function createDownloadButton (document, dataBackend, label, filterFn) {
  let $button = document.createElement('button')

  $button.innerText = label
  $button.className = 'mdl-course-download-button -no-inline'

  $button.addEventListener('click', () => {
    dataBackend.download(getDownloadLinks(document, filterFn))
  })

  return $button
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
  
  if ($content == null) {
    return
  }

  let $button1 = createDownloadButton(document, dataBackend, 'Download All Files', allFilesFilter)
  let $button2 = createDownloadButton(document, dataBackend, 'Download Solution Files', solutionFilesFilter)

  $content.insertBefore($button2, $content.firstChild)
  $content.insertBefore($button1, $button2)
}
