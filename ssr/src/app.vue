<template>
  <div class="routerView" ontouchstart="">

    <transition :name="transitionName">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <div v-show="reloadShow" class="reload" @click="reload()"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import './assets/style/reset.scss'
import './assets/style/global.scss'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      routerList: [],
      transitionName: 'fade',
      reloadShow: false
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0 ease;
}
.router-fade-enter,
.router-fade-leave-to {
  opacity: 0;
}

html {
  min-height: 100%;
  display: flex;
}
body {
  flex: 1;
  display: flex;
}
.routerView {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
