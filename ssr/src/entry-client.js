import {createApp} from './app'
import {getLocation, flatMapComponents, applyAsyncData, sanitizeComponent} from './utils'
const {app, router, store} = createApp()


function applySSRData(Component, ssrData) {
    if (window.__INITIAL_STATE__ && ssrData) {
      applyAsyncData(Component, ssrData)
    }
    Component._Ctor = Component
    return Component
  }
  
  // Get matched components
  function resolveComponents(router) {
    const path = getLocation(router.options.base, router.options.mode)
  
    return flatMapComponents(router.match(path), async (Component, _, match, key, index) => {
      // If component is not resolved yet, resolve it
      if (typeof Component === 'function' && !Component.options) {
        Component = await Component()
      }
      // Sanitize it and save it
      const _Component = applySSRData(sanitizeComponent(Component), window.__INITIAL_STATE__ ?  window.__INITIAL_STATE__.data[index] : null)
      match.components[key] = _Component
      return _Component
    })
  }


  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__.vuexStore)
  }


  router.onReady(async () => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
    await Promise.all(resolveComponents(router))
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to)
      const prevMatched = router.getMatchedComponents(from)
  
      // 我们只关心非预渲染的组件
      // 所以我们对比它们，找出两个匹配列表的差异组件
      let diffed = false
      const activated = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c))
      })
  
      if (!activated.length) {
        return next()
      }
  
      // 这里如果有加载指示器(loading indicator)，就触发
  
      Promise.all(activated.map(c => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to })
        }
      })).then(() => {
  
        // 停止加载指示器(loading indicator)
  
        next()
      }).catch(next)
    })
  
    // app.$mount('#app')
  })


  

// router.onReady(() => {
//     // 添加路由器挂钩以处理asyncData。
//     // 解决初始路由后执行此操作，以便我们不进行双重提取我们已有的数据。使用router.beforeResolve（）使所有异步组件已解析。
//     router.beforeResolve(async (to, from, next) => {
//         const matched = router.getMatchedComponents(to)
//         const prevMatched = router.getMatchedComponents(from)
//         let diffed = false
//         const activated = matched.filter((c, i) => {
//             return diffed || (diffed = (prevMatched[i] !== c))
//         })
//         const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
//         if (!asyncDataHooks.length) {
//             return next()
//         }
//         // 这里如果有加载指示器(loading indicator)，就触发
//         Promise.all(activated.map(c => {
//             if (c.asyncData) {
//               return c.asyncData({ store, route: to })
//             }
//           })).then(() => {
      
//             // 停止加载指示器(loading indicator)
      
//             next()
//           }).catch(next)
//         // next()
//         // Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
//         //     .then(() => {
//         //         next()
//         //     })
//         //     .catch(next)
//     })
//     // app.$mount('#app')
// })