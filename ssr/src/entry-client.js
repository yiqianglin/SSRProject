import {createApp} from './app'

const {app, router, store} = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}


router.onReady(() => {
    // 添加路由器挂钩以处理asyncData。
    // 解决初始路由后执行此操作，以便我们不进行双重提取我们已有的数据。使用router.beforeResolve（）使所有异步组件已解析。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                next()
            })
            .catch(next)
    })
    app.$mount('.routerView')
})