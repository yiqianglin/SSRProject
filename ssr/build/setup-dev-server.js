const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs') // webpack-dev-middware将文件读入内存，此时服务端就需要额外从内存中获取文件，我们可以借助memory-fs来读取内存中的文件
const webpack = require('webpack')
const chokidar = require('chokidar')
const clientConfig = require('./webpack.client.dev.config')
const clientNoSSRConfig = require('./webpack.client.dev.nossr.config')
const serverConfig = require('./webpack.server.config')
const projectConfig = require('../config/index')
const proxyMiddleware = require('http-proxy-middleware')
// require('eventsource-polyfill')

const readFile = (fs, file) => { // 同步读取client打包出来的东西
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    } catch (e) {
        console.log('readFile errors:', e)    
    }
}

// cb createBundleRenderer，cb返回参数bundle和options
module.exports = function setupDevServer(app, templatePath, cb) {
    let bundle
    let template
    let clientManifest

    let ready
    const readyPromise = new Promise(r => {
        ready = r
    })
    const update = () => {
        if (bundle && clientManifest) {
            ready()
            cb(bundle, {
                template,
                clientManifest
            })
        }
    }

    // 监控index.template.html的改变情况
    template = fs.readFileSync(templatePath, 'utf-8')
    // nodejs的文件系统 watch在部分编辑器编辑的时候，某些编辑器具有“安全写入”功能，不报告事件，高cpu利用率，改用chokidar
    chokidar.watch(templatePath).on('change', () => {
        template = fs.readFileSync(templatePath, 'utf-8')
        update()
    })

    // modify client config to work with hot middleware
    clientConfig.entry = ['webpack-hot-middleware/client?name=clientCommon', clientConfig.entry['app']]
    clientNoSSRConfig.entry.app = ['webpack-hot-middleware/client?name=clientNoSSR', clientNoSSRConfig.entry['app']] // ？？？这个必须要用app来包裹才可以使用热加载
    // console.log(JSON.stringify(clientConfig))
    // console.log('------------------------------------------------------')
    // console.log(JSON.stringify(clientNoSSRConfig))
    let combineConfig = [
        {
           name: 'clientCommon', ...clientConfig 
        },
        {
            name: 'clientNoSSR', ...clientNoSSRConfig
        }
    ]
    console.log(JSON.stringify(combineConfig))
    const combineCompiler = webpack(combineConfig)
    // clientCompiler.outputFileSystem = new MFS()
    const devMiddleware = require('webpack-dev-middleware')(combineCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
        // stats: 'errors-only'
    })
    app.use(devMiddleware)

    combineCompiler.hooks.done.tap('updateManifest', stats => { // 注册和执行自定义updateManifest事件
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) {
            console.log(stats.errors)
            return
        }
        clientManifest = JSON.parse(readFile(
            devMiddleware.fileSystem, // 用的是devMiddleware的文件读取方式
            'vue-ssr-client-manifest.json'
        ))
        update()
    })
    combineCompiler.hooks.done.tap('afterEmit', (compilation) => {
        const html = devMiddleware.fileSystem.readFileSync(path.join(clientNoSSRConfig.output.path + '/indexNoSSR.html'), 'utf-8')
        console.log('******cmfs*****:', html)
        app.get(/\/.*.html$/, (req, res) => {
            res.end(html)
        })
    })
    app.use(require('webpack-hot-middleware')(combineCompiler, { heartbeat: 5000 })) // webpack-hot-middleware 页面的热重载

/* 
    // 这里是开启两个webpack-hot-middleware的方法来构建两个伺服器，一个是ssr，一个非ssr。但是会出现某一个无法热更新的问题，因为webpack-hot-middleware只接受一个compilar。所以使用上面两个配置合成一个compiler的方案

    // dev middleware 伺服器
    // webpack-dev-middleware是一个express中间件，实现的效果两个，一个是在fs基于内存，提高了编译读取速度；第二点是，通过watch文件的变化，动态编译。
    const clientCompiler = webpack(clientConfig)
    // clientCompiler.outputFileSystem = new MFS()
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
        // stats: 'errors-only'
    })
    app.use(devMiddleware)

    clientCompiler.hooks.done.tap('updateManifest', stats => { // 注册和执行自定义updateManifest事件
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) {
            console.log(stats.errors)
            return
        }
        clientManifest = JSON.parse(readFile(
            devMiddleware.fileSystem, // 用的是devMiddleware的文件读取方式
            'vue-ssr-client-manifest.json'
        ))
        update()
    })

    const clientNoSSRCompiler = webpack(clientNoSSRConfig)
    // clientCompiler.outputFileSystem = new MFS()
    const devNoSSRMiddleware = require('webpack-dev-middleware')(clientNoSSRCompiler, {
        publicPath: clientNoSSRConfig.output.publicPath,
        noInfo: true
        // stats: 'errors-only'
    })
    app.use(devNoSSRMiddleware)

    clientNoSSRCompiler.hooks.afterEmit.tap('afterEmit', (compilation) => {
        const html = devNoSSRMiddleware.fileSystem.readFileSync(path.join(clientNoSSRConfig.output.path + '/indexNoSSR.html'), 'utf-8')
        console.log('******cmfs*****:', html)
        app.get(/\/.*.html$/, (req, res) => {
            res.end(html)
        })
    })
    
    // clientCompiler.plugin("done", function(compilation, callback) {
    //     // 执行一些异步……
    //     const html = devMiddleware.fileSystem.readFileSync(path.join(clientConfig.output.path + '/index.html'), 'utf-8')
    //     console.log('******cmfs done*****:', html)
    //     app.get('*', (req, res) => {
    //         res.end(html)
    //     })
    // })

    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 })) // webpack-hot-middleware 页面的热重载
    // app.use(require('webpack-hot-middleware')(clientNoSSRCompiler, { heartbeat: 5000 })) // webpack-hot-middleware 页面的热重载
    // app.use(require('webpack-hot-middleware')([clientCompiler, clientNoSSRCompiler], { heartbeat: 5000 })) // webpack-hot-middleware 页面的热重载
    
 */



 
    // watch and update server renderer
    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    // 监听文件修改，实时编译获取最新的 vue-ssr-server-bundle.json
    // 跟使用webpack-dev-server一样，在client目录下每次修改一个文件，它都会重新执行一次打包，然后就可以拿到新的文件了。
    serverCompiler.watch({}, (err, stats) => { // 为什么这里用的是watch，而上面是用.hooks.done
        if (err) throw err
        stats = stats.toJson()
        if (stats.errors.length) return

        // read bundle generated by vue-ssr-webpack-plugin
        // 用的是mfs的文件读取方式
        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
        update()
    })


    // 下面常规配置
    var proxyTable = projectConfig.dev.proxyTable
    if (proxyTable.context) {
        app.use(proxyMiddleware(proxyTable.context, proxyTable.options))
    }

    // handle fallback for HTML5 history API
    // 服务器重定向 注意这个坑，服务器重定向适合在history模式，单页模式。在ssr的时候，不要开启这个，会导致服务端收到的url跟客户端对不上，从而导致virtualDom不同报错
    // var rewrites = {
    //     rewrites: [{
    //         from: /\/mobile\/.*\.html/, // 正则或者字符串
    //         to: '/', // 字符串或者函数
    //     }],
    //     htmlAcceptHeaders: ['text/html', '*/*']
    // }
    // app.use(require('connect-history-api-fallback')(rewrites))

    return readyPromise
}
