/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

/**
 *
 * @param {number} part
 * @returns {string}
 */
function toHex (part) {
  var hex = part.toString(16)

  if (hex.length === 1) {
    hex = '0' + hex
  }

  return hex
}

/**
 *
 * @param {string} hex
 * @returns {number}
 */
function parseHex (hex) {
  return parseInt(hex, 16)
}

export class Color {
  /**
   *
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   */
  constructor (red, green, blue) {
    /**
     *
     * @type {number}
     */
    this.red = parseInt(red)

    /**
     *
     * @type {number}
     */
    this.green = parseInt(green)

    /**
     *
     * @type {number}
     */
    this.blue = parseInt(blue)
  }

  /**
   *
   * @returns {string}
   */
  toString () {
    return '#' + toHex(this.red) + toHex(this.green) + toHex(this.blue)
  }

  /**
   *
   * @returns {Array<number>}
   */
  toArray () {
    return [ this.red, this.green, this.blue ]
  }

  /**
   *
   * @returns {string}
   */
  valueOf () {
    return this.toString()
  }

  /**
   *
   * @param {string} str
   */
  static parse (str) {
    str = str.substr(1)

    if (str.length === 3) {
      return new Color(
        parseHex(str[ 0 ] + str[ 0 ]),
        parseHex(str[ 1 ] + str[ 1 ]),
        parseHex(str[ 2 ] + str[ 2 ])
      )
    }

    if (str.length === 6) {
      return new Color(
        parseHex(str.substr(0, 2)),
        parseHex(str.substr(2, 2)),
        parseHex(str.substr(4, 2))
      )
    }

    throw new Error('Invalid format. Expecting either #fff or #ffffff')
  }

  /**
   *
   * @param {string} str
   * @returns {boolean}
   */
  static isValid (str) {
    try {
      Color.parse(str)
      return true
    } catch (_) {
      return false
    }
  }
}

/**
 *
 * @type {Color}
 */
export const defaultColor = Color.parse('#2ecc71')
