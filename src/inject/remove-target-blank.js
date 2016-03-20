/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {HTMLDocument} document
 */
export function removeTargetBlank (document) {
  Array.from(document.querySelectorAll('.linkbox a'))
    .filter(($a) => $a.target === '_blank')
    .forEach(($a) => $a.removeAttribute('target'))
}
