import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function netWorkErrorTo () {
  console.log('组件加载出错')
}

const about = () =>
  import(/* webpackChunkName: "about" */ '../page/mobile/about/about.vue')
    .catch((error, other) => {
      console.log(error)
      return netWorkErrorTo()
    })

const home_cancer = () =>
  import(/* webpackChunkName: "home_cancer" */ '../page/mobile/home_cancer/home_cancer.vue')
    .catch((error, other) => {
      console.log(error)
      return netWorkErrorTo()
    })

const home = () =>
  import(/* webpackChunkName: "home" */ '../page/mobile/home/home.vue')
    .catch((error, other) => {
      console.log(error)
      return netWorkErrorTo()
    })

var scrollBehavior = async (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    if (from.meta.keepAlive) {
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: to.meta.savedPosition || 0 })
      }, 300)
    })
  }
}

export function createRouter () {
  return new VueRouter({
    mode: 'history',
    // base: __dirname,
    scrollBehavior,
    routes: [
      {
        path: '',
        redirect: '/mobile/home.html',
        meta: {
        }
      },
      {
        name: 'home_cancer',
        path: '/mobile/home_cancer.html',
        component: home_cancer,
        meta: {
        }
      },
      {
        name: 'about',
        path: '/mobile/about.html',
        component: about
      },
      {
        name: 'home',
        path: '/mobile/home.html',
        component: home
      },
      {
        path: '*',
        redirect: '/mobile/home.html'
      }
    ]
  })
}
