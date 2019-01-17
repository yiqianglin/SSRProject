/* global require, module, process */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const argv = require('yargs').argv
const chpr = require('child_process')
const branch = chpr.execSync('git branch').toString().split('\n').filter(function (item) {
    return /^\*/.test(item)
})[0].replace(/\*\s*/, '')
const VERSION = branch.split('\/')[1] || branch || '1.0.0'

// const SentryPlugin = require('@tencent/webpack-sentry-plugin')
// const SentryPlugin = require('webpack-sentry-plugin')
// const _package = JSON.parse(fs.readFileSync('./package.json')) // 以后用空改成commandar

const config = require('../config')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: '#source-map',
    entry: {
        app: './src/entry-client.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                oneOf: [
                    {
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    },
                    {
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                ]
            },
            {
                test: /\.postcss$/,
                oneOf: [
                    {
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    },
                    {
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                ]
            },
            {
                test: /\.scss$/,
                oneOf: [
                    {
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader', // 这一层输出没有了注释
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    },
                    {
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: 'static/js/moblie/[name].[chunkhash:7].js',
        chunkFilename: 'static/js/moblie/[name].[chunkhash:7].js',
        sourceMapFilename: `../../sourcemap/${VERSION}/[name].[chunkhash:7].js.map`
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'async',
            automaticNameDelimiter: '~',
            minSize: 80000, // 根据初始size来划分？导致压缩后可能很小
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                // default: false, // 禁用默认的缓存组(低级缓存组)，使用自定义缓存组
                // libs: {
                //     test: /libs/,
                //     filename: 'static/js/[name].[hash:8].js',
                //     name: 'libsCommonsChunk',
                //     chunks: 'initial',
                //     minSize: 30000,
                //     minChunks: 1,
                //     reuseExistingChunk: true,
                //     priority: 20
                // },
                // commons: {  // 无效
                //     test: /![\\/]node_modules[\\/]/,
                //     filename: 'static/js/[name].[hash:8].js',
                //     name: 'commonChunk',
                //     chunks: 'initial',
                //     minSize: 30000,
                //     minChunks: 1,
                //     reuseExistingChunk: true,
                //     priority: 10
                // },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -20,
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                },
                // sourceMap: config.build.productionSourceMap,
                sourceMap: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: { disable: true },
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            })
        ],

        namedChunks: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': argv.env === 'production' ? '\'production\'' : '\'testing\'',
            _ENV_: argv.env === 'production' ? '\'production\'' : '\'testing\'',
            _VERSION_: JSON.stringify(VERSION),
            'process.platform': 'client'
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:7].css',
            chunkFilename: 'static/css/[name].[contenthash:7].css'
        }),
        new HtmlWebpackPlugin({
            chunks: ['manifest', 'vendors', 'app'],
            title: '企鹅医典',
            favicon: 'favicon.ico',
            filename: 'index.html',
            template: 'src/index.template.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode (chunk1, chunk2) { // 控制插入的js顺序
                const orders = ['manifest', 'vendors', 'app']
                const order1 = orders.indexOf(chunk1.names[0])
                const order2 = orders.indexOf(chunk2.names[0])
                return order1 - order2
            }
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/libs',
                to: 'static/libs',
                cache: true
            }
        ])
    ]
})

if (config.build.bundleAnalyzerReport && argv.analyze) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
