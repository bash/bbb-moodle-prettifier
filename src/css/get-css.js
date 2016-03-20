/**
 * (c) 2015 Ruben Schmidmeister
 */

import { compileCSS } from './compile-css'
import { getCSSFile } from '../css/get-css-file'
import { defaultColor } from '../value/color'

/**
 *
 * @param {StorageCache} storage
 * @param {Map} runtimeStorage
 * @returns {Promise<string>}
 */
export function getCSS (storage, runtimeStorage) {
  if (runtimeStorage.has('css')) {
    return Promise.resolve(runtimeStorage.get('css'))
  }

  return storage
    .get('color', defaultColor.toString())
    .then((color) => compileCSS(getCSSFile(), color))
    .then((css) => {
      runtimeStorage.set('css', css)

      return css
    })
}
