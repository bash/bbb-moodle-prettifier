/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {Function} fn
 * @param {*} args
 */
export function wrapFunction (fn, ...args) {
  return function (...callArgs) {
    let combinedArgs = [].concat(args, callArgs)

    fn.call(this, ...combinedArgs)
  }
}
