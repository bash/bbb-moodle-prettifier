#!/usr/bin/env node

'use strict'

const stdin = process.stdin
const stdout = process.stdout
const key = process.argv[ 2 ]

let data = ''

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', (buf) => {
  data += buf
})

stdin.on('end', () => {
  let output = JSON.stringify({
    [key]: data
  })

  stdout.write(output)
})