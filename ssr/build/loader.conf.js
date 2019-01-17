'use strict'
const utils = require('./utils')
const config = require('../config')
const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'testing'
const idDev = process.env.NODE_ENV === 'development'

