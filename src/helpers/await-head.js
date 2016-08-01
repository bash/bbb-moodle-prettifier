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
    const done = () => {
      resolve()
      observer.disconnect()
    }
    
    const observer = new MutationObserver((mutations) => {
      if (document.head) {
        return done()
      }
      
      mutations
        .map((mutation) => Array.from(mutations.addedNodes || []))
        .reduce(flatten, [])
        .filter((node) => node.tagName === 'HEAD')
        .forEach(done)
    })

    observer.observe(document, { childList: true, subtree: true })
  })
}
