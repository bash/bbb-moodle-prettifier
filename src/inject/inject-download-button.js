/**
 * (c) 2015 Ruben Schmidmeister
 */

const solutionFilesFilter = ($) => $.textContent.match(/(lösung)|(_l)|(-l)/i)
const allFilesFilter = () => true

const head = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
        resolve({ url: xhr.responseURL, status: xhr.status })
      }
    }

    xhr.onerror = reject

    xhr.open('HEAD', url)
    xhr.send()
  })
}

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
    .map(($) => {
      console.info('fetching url', $.href)
      return head($.href)
        .then((resp) => {
          const url = new window.URL(resp.url)
          const filename = url.pathname.split('/').pop()

          return { url: resp.url, filename }
        })
    })
}

/**
 *
 * @param {HTMLDocument} document
 * @param {DataBackend} dataBackend
 * @param {string}  label
 * @param {Function} filterFn
 * @returns {HTMLElement}
 */
function createDownloadButton (document, dataBackend, label, filterFn) {
  const $button = document.createElement('button')

  $button.innerText = label
  $button.className = 'mdl-course-download-button -no-inline'

  $button.addEventListener('click', () => {
    getDownloadLinks(document, filterFn)
      .forEach((download) => {
        download.then((download) => dataBackend.download([download]))
      })
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

  const $content = document.querySelector('.course-content')

  // noinspection EqualityComparisonWithCoercionJS
  if ($content == null) {
    return
  }

  const $button1 = createDownloadButton(document, dataBackend, 'Download All Files', allFilesFilter)
  const $button2 = createDownloadButton(document, dataBackend, 'Download Solution Files', solutionFilesFilter)

  $content.insertBefore($button2, $content.firstChild)
  $content.insertBefore($button1, $button2)
}
