/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {Array<string>} permissions
 */
export function ensurePermissions (permissions) {
  return new Promise((resolve, reject) => {

    chrome.permissions.contains({ permissions }, (result) => {
      if (result) {
        return resolve()
      }

      chrome.permissions.request({ permissions }, (granted) => {
        if (granted) {
          return resolve()
        }

        reject()
      })
    })

  })
}
