/**
 * (c) 2016 Ruben Schmidmeister
 */

/**
 * @template <E>
 * @param {E} Element
 * @param {DataBackend} dataBackend
 * @returns E
 */
export function wrapElement (Element, dataBackend) {
  function WrappedElement () {
    Element.apply(this, arguments)
  }

  WrappedElement.prototype = Object.create(Element.prototype)
  WrappedElement.prototype.constructor = WrappedElement
  WrappedElement.prototype.dataBackend = dataBackend

  return WrappedElement
}
