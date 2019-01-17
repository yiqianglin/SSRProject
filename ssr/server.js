const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const { createBundleRenderer } = require('vue-server-renderer')
const cookieParser = require('cookie-parser')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'

const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

/**
 * 使用 server bundle 和（可选的）选项创建一个 BundleRenderer 实例。
 *
 * @param {any} bundle
 * @param {any} options
 * @returns
 */
function createRenderer(bundle, options) {
    // createBundleRenderer 支持热重载（通过读取更新后的 bundle，然后重新创建 renderer 实例）
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            cache: LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            }),
            basedir: resolve('./dist'),
            runInNewContext: false, // 对于每次渲染，bundle renderer 将创建一个新的 V8 上下文并重新执行整个 bundle。性能开销很大
            shouldPrefetch: false
        })
    )
}

let renderer
let readyPromise

const templatePath = resolve('./src/index.template.html')

if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require('./dist/vue-ssr-server-bundle.json')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {
        template,
        clientManifest
    })
} else {
    // setup-dev-server.js 实现原理跟webpack-dev-server是相同
    // setup-dev-server.js
    // 引入webpack-hot-middleware和webpack-dev-middleware，建立客户端和服务器之间热更新websocket，另外把临时文件生成到内存中
    // 使用webpack和chokidar，监控vue、js、html等的变化
    // 实现了异步的编译回调和不断的监控
    readyPromise = require('./build/setup-dev-server')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options)
        }
    )
}

function render(req, res) {
    const s = Date.now()

    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Server', serverInfo)

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }
    console.log('服务器拿到的cookie：', req.cookies, req.url)
    const context = {
        title: '', // 无效
        head: '',
        url: req.url,
        cookies: req.cookies   // 注入cookie
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.send(html)
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
}

const serve = (path, cache) =>
    express.static(resolve(path), {
        maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
    })

app.use(cookieParser())
app.use(compression({ threshold: 0 })) // 压缩中间件
app.use(favicon('./favicon.ico'))
app.use('/dist', serve('./dist', true))

app.get(
    '*',
    isProd
        ? render
        : (req, res) => {
            return readyPromise.then(() => {
                render(req, res)
            })
        }
)

const port = process.env.PORT || 8089
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
