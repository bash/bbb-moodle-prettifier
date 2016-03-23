#!/usr/bin/env node
/*
 * (c) 2016 Ruben Schmidmeister <ruby@fog.im>
 */

'use strict'

const data = require('../data.json')
const argv = process.argv

console.log(data[ argv[ 2 ] ])
