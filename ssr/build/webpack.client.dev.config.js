/* global require, module */
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    // eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    entry: {
        app: './src/entry-client.js'
    },
    module: {
        rules: [
            {
                'test': /\.css$/,
                // oneOf: https://blog.csdn.net/sinat_17775997/article/details/78387007
                'oneOf': [
                    {
                        'use': [
                            'vue-style-loader',
                            {
                                'loader': 'css-loader',
                                'options': {
                                    'minimize': false, 'sourceMap': true
                                }
                            }]
                    }]
            }, {
                'test': /\.postcss$/,
                'oneOf': [
                    {
                        'use': [
                            'vue-style-loader',
                            {
                                'loader': 'css-loader',
                                'options': {
                                    'minimize': false,
                                    'sourceMap': true
                                }
                            }
                        ]
                    }
                ]
            }, {
                'test': /\.scss$/,
                'oneOf': [
                    {
                        'use': [
                            'vue-style-loader',
                            {
                                'loader': 'css-loader',
                                'options': {
                                    'minimize': false,
                                    'sourceMap': true
                                }
                            },
                            {
                                'loader': 'sass-loader',
                                'options': {
                                    'sourceMap': true
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    optimization: {
        namedChunks: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'development',
            '_ENV_': '\'development\'',
            'process.platform': '\'client\''
        }),
        new FriendlyErrorsPlugin(),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: ['vendors', 'app'],
            favicon: 'favicon.ico',
            filename: 'index.html',
            template: 'src/index.template.html',
            inject: true,
            title: '腾讯医典'
        }),
        new VueSSRClientPlugin(),
        // new BundleAnalyzerPlugin()
    ]
})
