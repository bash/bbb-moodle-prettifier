/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

/**
 *
 * @param {string} url
 * @param {string} responseType
 * @returns {Promise<string>}
 */
export function fetch (url, responseType = 'text') {
  let xhr = new XMLHttpRequest()

  xhr.open('GET', url, true)
  xhr.responseType = responseType

  return new Promise((resolve) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(xhr.response)
      }
    }

    xhr.send()
  })
}
