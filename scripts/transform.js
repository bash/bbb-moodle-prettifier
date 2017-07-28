#!/usr/bin/env node

'use strict'

const fs = require('fs')
const argv = process.argv.slice(2)

const source = JSON.parse(fs.readFileSync(argv[ 0 ], 'utf8'))
const transformation = JSON.parse(fs.readFileSync(argv[ 1 ], 'utf8'))
const actions = [ '$push', '$set', '$concat' ]

/**
 * 
 * @param {{}|Array} source
 * @returns {{}|Array}
 */
const createCopy = (source) => {
  if (Array.isArray(source)) {
    return Array.from(source)
  }

  return Object.assign({}, source)
}

/**
 *
 * @param {{}} result
 * @param {string} key
 * @param {{ $push: * }} value
 */
const $push = (result, key, value) => {
  if (!Array.isArray(result[ key ])) {
    result[ key ] = []
  }

  result[ key ].push(value[ '$push' ])
}

/**
 *
 * @param {{}} result
 * @param {string} key
 * @param {{ $push: * }} value
 */
const $concat = (result, key, value) => {
  if (!Array.isArray(result[ key ])) {
    result[ key ] = []
  }

  result[ key ].concat(value[ '$concat' ])
}

/**
 *
 * @param {string} action
 * @param {{}} result
 * @param {string} key
 * @param {{}} value
 */
const performAction = (action, result, key, value) => {
  switch (action) {
    case '$push':
      return $push(result, key, value)
    case '$set':
      return result[ key ] = value[ '$set' ]
    case '$concat':
      return $concat(result, key, value)
  }
}

/**
 *
 * @param {{}} source
 * @param {{}} transformation
 * @returns {{}}
 */
const transform = (source, transformation) => {
  const result = createCopy(source)

  for (let key of Object.keys(transformation)) {
    const value = transformation[ key ]

    if (key.substr(0, 1) === '$') {
      continue
    }

    for (let action of actions) {
      if (!value.hasOwnProperty(action)) {
        continue
      }

      performAction(action, result, key, value)

      break
    }

    const isAction = Object
      .keys(value)
      .find((k) => k.substr(0, 1) === '$')

    if (!isAction) {
      result[ key ] = transform(result[ key ], value)
    }
  }

  return result
}

console.log(JSON.stringify(transform(source, transformation), null, 2))
