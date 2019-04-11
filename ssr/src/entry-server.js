// entry-server.js
import {createApp} from './app'
import { sanitizeComponent, applyAsyncData, promisify} from './utils'
// import 'babel-polyfill';

export default context => {
    return new Promise((resolve, reject) => {
        const {app, router, store} = createApp()
        console.log('context.url:', context.url)
        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            console.log('路由匹配：', router.getMatchedComponents())
            if (!matchedComponents.length) {
                console.log('reject 404')
                return reject({code: 404})
            }
            
            // 对所有匹配的路由组件调用 `asyncData()`
            context.asyncData = {}
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    Component = sanitizeComponent(Component)
                    let promise = promisify(Component.options.asyncData, {
                        store,
                        route: router.currentRoute,
                        cookies: context.cookies,
                    })
          
                    return promise.then((asyncDataResult) => {
                        context.asyncData[Component.cid] = asyncDataResult
                        console.log('asyncDataResult1111111111111111111111111111111:', asyncDataResult)
                        applyAsyncData(Component)
                        console.log('Component.options.data:', Component.options.data )
                        return asyncDataResult
                    })
                }
            })).then((data) => {
                // 在所有预取钩子(preFetch hook) resolve 后，
                // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                // 当我们将状态附加到上下文，
                // 并且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                // console.log('看看这里的data:', JSON.stringify(data))
                // console.log('看看这里的context:', context)
                if (store) {
                    context.state = { vuexStore: store.state }
                    context.state.data = data
                } else {
                    context.state.data = data
                }
                // console.log('看看这里的context.state:', context.state)
                console.log('最后的content-------------------------')
                console.log(JSON.parse(JSON.stringify(context)))
                resolve(app)
            }).catch(reject)
        }, reject)
    })
}