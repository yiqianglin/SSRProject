/* global baike */
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import { request } from 'src/js/common'

import { ActiveBanner } from 'components/activity/activity'
import TestComp from 'components/testComp/testComp.vue'
// import publicHot from 'components/public_hot/public_hot.vue'

export default {
  data () {
    return {
      // 顶部运营位
      activeOps: {
        list: [],
        area: 'list_top'
      },
      bannerList: null,
      keystoneList: []
    }
  },
  components: {
    ActiveBanner,
    TestComp
  },
  computed: {
    ...mapState ({
      hotList: 'hotList',
      departList: 'departmentList',
      // keystoneList: 'keystoneList'
    }),
    redpointState () {
      return true
    }
  },
  filters: {
  },
  asyncData ({ store, component }) {
    // console.log('this:', this.methods.getBanner())
    // console.log('--------------------')
    // console.log('component:', component)
    let that = component
    return Promise.all([
      store.dispatch('getHotList'),
      store.dispatch('getActiveDataTop'),
      // store.dispatch('getKeystoneList'),
      that.methods.getBanner(that)
    ])
  },
  created () {
    // this.$store.dispatch('getHotList')
  },
  mounted () {
    // 这里下面两个获取数据，就可以访问组件的实例了
    this.getKeystoneList()
    
    this.bind()
  },
  activated () {
  },
  watch: {},
  methods: {
    async getKeystoneList () {
      let result = await request({
        url: 'GetActiveData',
        method: 'POST',
        params: {
            activetype: 11,
            name: ''
        }
      })
      this.keystoneList = result.data
    },
    async getBanner (component) {
      let result = await request({
        url: 'GetActiveData',
        method: 'POST',
        params: {
            activetype: 1,
            name: ''
        }
      })
      console.log('************', this, '这里拿到的this，就是mehtods')
      component.bannerList = result.data
      // component.activeOps.list = result.data
      // console.log(result)
      // this.bannerList = result.data
      // this.activeOps.list = result.data
      return result
    },
    toMy () {
    },
    toSearch () {
    },
    toActive () {
      this.$router.push({ name: 'home_cancer' })
    },
    bind: function () { }
  }
}
