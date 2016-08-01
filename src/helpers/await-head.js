/**
 * (c) 2015 Ruben Schmidmeister
 */

const flatten = (a, b) => a.concat(b)

export function awaitHead () {
  if (document.head != null) {
    return Promise.resolve()
  }
  
  console.log('creating mutation observer...')

  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      mutations
        .map((mutation) => Array.from(mutations.addedNodes))
        .reduce(flatten, [])
        .filter((node) => node.tagName === 'HEAD')
        .forEach(() => {
          resolve()
          observer.disconnect()
        })
    })

    observer.observe(document, { childList: true, subtree: true })
  })
}
