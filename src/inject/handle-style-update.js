/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {string} css
 * @returns {string}
 */
function createCssBlob (css) {
  let blob = new Blob([ css ], { type: 'text/css' })

  return URL.createObjectURL(blob)
}

/**
 *
 * @param {HTMLLinkElement} style
 * @param {string} css
 * @param {bool} isDomReady
 */
export function handleStyleUpdate (style, css, isDomReady) {
  let importUrl = createCssBlob(css)

  if (!isDomReady) {
    style.href = importUrl

    return style
  }

  let newStyle = document.createElement('link')
  newStyle.rel = 'stylesheet'
  newStyle.href = importUrl

  if (style.parentNode) {
    style.parentNode.appendChild(newStyle)
    style.parentNode.removeChild(style)
  }

  return newStyle
}
