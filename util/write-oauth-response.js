/*
 * (c) 2016 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict'

const fs = require('fs')
const path = require('path')

const data = require('../data.json')
const argv = process.argv

const oauthData = JSON.parse(argv[ 2 ])

data[ 'googleAccessToken' ] = oauthData[ 'access_token' ]
data[ 'googleRefreshToken' ] = oauthData[ 'refresh_token' ]

fs.writeFileSync(path.join(__dirname, '..', 'data.json'), JSON.stringify(data, null, '  '))
