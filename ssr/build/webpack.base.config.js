const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const vueLoaderConfig = require('./vue-loader.conf')
const isBuilding = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing'
const utils = require('./utils')
const config = require('../config')
const projectRoot = path.resolve(__dirname, '/')
console.log('isBuilding:', isBuilding)
// const styleLoaders = utils.styleLoaders({sourceMap: !isBuilding, extract: isBuilding, usePostCSS: true});

/**
 * 根据env、config生成对应环境配置
 * 
 * @param {Array} configList 
 */
function generatorConfigByEnv (configList) {
    if (configLI.length < 3) {
        throw new Error('configList的长度 < 3')
    }
    let env = process.env.NODE_ENV
    switch (env) {
    case 'production':
        return configList[0]
    case 'testing':
        return configList[1]
    case 'development':
        return configList[2]
    }
}

module.exports = {
    performance: {
        maxEntrypointSize: 300000, // 入口最大的size
        hints: isBuilding ? 'warning' : false
    },
    output: {
        // path: config.build.assetsRoot, // '/'
        path: path.resolve(__dirname, '../dist'),
        publicPath: config.dev.assetsPublicPath, // 'static'
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    devtool: isBuilding ? false : '#cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.vue', '.sass', '.scss', '.css'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'src': path.resolve(__dirname, '../src'),
            'components': path.resolve(__dirname, '../src/components'),
            'page': path.resolve(__dirname, '../src/page'),
            'assets': path.resolve(__dirname, '../src/asstes'),
            'store': path.resolve(__dirname, '../src/store'),
            'utils': path.resolve(__dirname, '../src/utils'),
            'libs': path.resolve(__dirname, '../src/libs'),
            vue: 'vue/dist/vue.js'
        }
    },
    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },
    module: {
        rules: [
            // ...styleLoaders,
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: vueLoaderConfig
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: projectRoot,
                exclude: [/node_modules/, path.join(__dirname, '../src/libs/')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // regExp: /\S+\/mobile\/(\S+)\/(\S+)\.(\S+)$/,
                            name: 'static/images/[name].[hash:7].[ext]',
                            limit: isBuilding ? 8192 : 1
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'static/fonts/[name].[hash:7].[ext]',
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /lufylegend/, // 这个test需要优化
                loader: 'exports-loader?window.LGlobal!script-loader'
            },
            {
                test: /weui.min.js/,
                loader: 'exports-loader?window.weui!script-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。这些打包函数使你的 JavaScript 在浏览器中处理的更慢。相比之下，一些工具像 Closure Compiler 和 RollupJS 可以提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:7].css',
            chunkFilename: 'static/css/[name].[contenthash:7].css'
        })
    ]
}