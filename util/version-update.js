/*
 * (c) 2016 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict'

const path = require('path')
const fs = require('fs')
const readline = require('readline')
const spawn = require('child_process').spawn

const manifestFile = path.join(__dirname, '..', 'manifest.json')
const packageFile = path.join(__dirname, '..', 'package.json')

const manifest = require(manifestFile)
const packageInfo = require(packageFile)

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log(`enter new version number (current: ${manifest.version})`)

rl.question('> ', (version) => {
  rl.close()

  manifest.version = version
  packageInfo.version = version

  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, '  '))
  fs.writeFileSync(packageFile, JSON.stringify(packageInfo, null, '  '))

  spawn('git', [ 'tag', '--delete', `v${version}` ])
  spawn('git', [ 'tag', `v${version}` ])
})
