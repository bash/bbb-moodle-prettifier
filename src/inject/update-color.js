/**
 * (c) 2015 Ruben Schmidmeister
 */

import Color from '../../node_modules/color-js/color'

/**
 *
 * @param {HTMLDocument} document
 * @param {string} color
 */
export function updateColor (document, color) {
  let root = document.documentElement

  let updateProperty = (prop, value) => {
    root.style.removeProperty(prop)
    root.style.setProperty(prop, value, '')
  }

  color = Color(color)

  updateProperty('--mdl-user-color', color)
  updateProperty('--mdl-user-color-darker-10', color.darkenByAmount(0.1))
  updateProperty('--mdl-user-color-darker-20', color.darkenByAmount(0.2))
  updateProperty('--mdl-user-color-darker-30', color.darkenByAmount(0.3))
  updateProperty('--mdl-user-color-lighter-10', color.lightenByAmount(0.1))
}
