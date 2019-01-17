var path = require('path')

module.exports = {
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        sourcemapsRoot: path.resolve(__dirname, '../sourcemap'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/dist/',
        productionSourceMap: true,
        bundleAnalyzerReport: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
    },
    dev: {
        port: 8082,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            context: function (pathname, req) {
                return ((pathname.match('^/mobile') || pathname.match('^/api')) && !pathname.match('.html'))
            },
            options: {
                target: 'http://baikedev.sparta.html5.qq.com',
                changeOrigin: true,
                ws: true
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
