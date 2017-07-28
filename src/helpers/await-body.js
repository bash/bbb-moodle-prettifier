/**
 * (c) 2015 Ruben Schmidmeister
 */

const flatten = (a, b) => a.concat(b)

export function awaitBody () {
  if (document.body != null) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const done = () => {
      resolve()
      observer.disconnect()
    }

    const observer = new MutationObserver((mutations) => {
      if (document.body) {
        return done()
      }

      const body = mutations
        .map((mutation) => Array.from(mutations.addedNodes || []))
        .reduce(flatten, [])
        .find((node) => node.tagName === 'BODY')

      if (body) {
        done()
      }
    })

    observer.observe(document, { childList: true, subtree: true })
  })
}
