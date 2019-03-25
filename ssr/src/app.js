import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
import { createStore } from './store/index'
import { createRouter } from './router/index'
import Promise from 'es6-promise'
Promise.polyfill()
Vue.prototype.$axios = axios

export function createApp() {
    const router = createRouter()
    const store = createStore()

    // 同步路由状态(route state)到 store
    sync(store, router)

    const app = new Vue({
        router,
        store,
        el: '#app',
        render: h => h(App)
    })

    return {app, router, store}
}


