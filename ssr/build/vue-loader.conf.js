'use strict'
const utils = require('./utils')
const isBuilding = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing'


const sourceMapEnabled = isBuilding ? false : true

let vueLoaderConfig = {
    loaders: utils.cssLoaders({
        sourceMap: sourceMapEnabled,
        extract: isBuilding,
        usePostCSS: true
    }),
    cssSourceMap: sourceMapEnabled,
    cacheBusting: true,
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}

console.log('vueLoaderConfig:', JSON.stringify(vueLoaderConfig))
module.exports = vueLoaderConfig