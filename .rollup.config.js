import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'

const isProduction = process.env[ 'NODE_ENV' ] === 'production'

const commonjsModules = [
  'node_modules/color-js/color.js'
]

const plugins = [ json(), babel(), commonjs({ include: commonjsModules }) ]

if (isProduction) {
  plugins.push(uglify())
}

export default {
  plugins: plugins,
  acorn: {
    ecmaVersion: 8,
    allowReserved: true
  },
  sourceMap: !isProduction,
  format: 'iife'
}
