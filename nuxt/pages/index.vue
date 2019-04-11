<template>
  <div class="container">
    <div class="home-header">
      <!-- 顶部运营位 -->
      <active-banner v-if="activeOps && activeOps.list.length" :options="activeOps" />
      <span :class="{update: redpointState}" class="icon-my" @click="toMy" />
      <div class="home-search">
        <div class="search-btn" @click="toSearch">
          <span>搜疾病／症状／文章</span>
        </div>
        <!-- 搜索热词 -->
        <p class="search-hot ellipsis" v-if="hotList && hotList.length">
          <span v-for="(item, index) in hotList.slice(0, 3)" :key="index" >{{ item.name }}</span>
        </p>
      </div>
    </div>
    <!-- 重点板块 -->
    <div v-if="keystoneList && keystoneList.length" class="keystone-list">
      <div v-for="(item, index) in keystoneList" :key="index" :style="item.image ? 'background-image: url(' + item.image + ')' : ''" class="keystone-item" @click="toActive(item)">
        <!-- <img v-if="item.image" :src="item.image"> -->
        <p class="title ellipsis">{{ item.text }}</p>
        <p class="desc ellipsis">{{ item.desc }}</p>
        <a href="javascript:" class="btn-link" />
      </div>
    </div>
    <!-- 疾病科室 -->
    <div class="home-disease">
      <div class="disease-depart">
        <div v-if="departList && departList.length" class="depart-list">
          <div v-for="(item, index) in departList" :key="index" class="depart-item">
            <img v-if="item.image" :src="item.image">
            <p class="title ellipsis">{{ item.text }}</p>
            <a href="javascript:" class="btn-link" />
          </div>
        </div>
      </div>
      <p class="disease-all">全部疾病
        <a href="javascript:" class="btn-link" />
      </p>
    </div>
    <div>
      {{ num }} <a href="javascript:void(0);" @click="numIncreate">数字增加</a>
      <p></p>
      <a href="/about">跳转看看</a>
      <nuxt-link to="/about">关于</nuxt-link>
    </div>
  </div>
</template>


<script>
/* global baike */
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import { request } from '~/plugins/common'

import { ActiveBanner } from '~/components/activity/activity'

export default {
  data () {
    return {
      // 顶部运营位
      activeOps: {
        list: [],
        area: 'list_top'
      },
      bannerList: null,
      keystoneList: [],
      // hotList:[],
      // departList: [],
      testData: 'sss',
      num: 0
    }
  },
  components: {
    ActiveBanner
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
  async asyncData ({ store }) {
    // console.log('store', store)
    await Promise.all([
      store.dispatch('getHotList'),
      store.dispatch('getActiveDataTop'),
      store.dispatch('getKeystoneList'),
    ])
    // console.log('www')
    return {testData: 'wwww', otherTestData: 'qqq'}
  },
  created () {
    // this.$store.dispatch('getHotList')
  },
  mounted () {
    // 这里下面两个获取数据，就可以访问组件的实例了
    this.getKeystoneList()
    this.getBanner()
    this.bind()
  },
  activated () {
  },
  watch: {},
  methods: {
    async getKeystoneList () {
      let result = await request({
        url: '/api/GetActiveData',
        method: 'POST',
        params: {
            activetype: 11,
            name: ''
        }
      })
      this.keystoneList = result.data
    },
    async getBanner () {
      let result = await request({
        url: '/api/GetActiveData',
        method: 'POST',
        params: {
            activetype: 1,
            name: ''
        }
      })
      // console.log(result)
      this.bannerList = result.data
      this.activeOps.list = result.data
      return result
    },
    toMy () {
    },
    toSearch () {
    },
    toActive () {
      this.$router.push({ name: 'home_cancer' })
    },
    bind: function () { },
    numIncreate () {
      this.num += 1
      console.log(this.$store)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '~assets/scss/common-util.scss';
$page-bg: #f7f7f7;
$block-bg: #fff;
.container {
  background: $page-bg;
  // width: 7.5rem;
  // margin: 0 auto;
}

.home-header {
  height: 4.42rem;
  position: relative;
  background: linear-gradient(-127deg, #1BC29D 51%, #07BAA2 91%);
  /deep/ .banner-pagination {
    bottom: .2rem;
  }
  /deep/ .banner-container {
    height: 100%;
  }
  .icon-my {
    position: absolute;
    top: 0;
    right: 0;
    width: .8rem;
    height: .8rem;
    background: url(~assets/images/mobile/home/my.png) no-repeat;
    background-size: .32rem .35rem;
    background-position: .12rem .24rem;
    z-index: 1;
    &.update::after {
      content: " ";
      position: absolute;
      top: .16rem;
      right: .16rem;
      width: .12rem;
      height: .12rem;
      background: #FF4417;
      border-radius: 50%;
    }
  }
}

// 顶部搜索
.home-search {
  position: absolute;
  left: 0;
  right: 0;
  top: 2.42rem;
  margin: 0 .65rem;
  z-index: 1;
  .search-btn {
    padding: .26rem 0;
    border-radius: 1rem;
    background: #fff;
    text-align: center;
    font-size: 0;
    span {
      &::before {
        content: " ";
        width: .36rem;
        height: .36rem;
        display: inline-block;
        vertical-align: middle;
        margin: -.05rem .05rem 0 0;
        background: url(~assets/images/mobile/search_new/search_btn.png) no-repeat center/contain;
      }
      font-size: .26rem;
      font-weight: $font-medium;
      color: #c6c6c6;
    }
  }
  .search-hot {
    text-align: center;
    line-height: .7rem;
    font-size: .28rem;
    color: #fff;
    opacity: .54;
    span {
      padding: 0 .25rem;
      position: relative;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
      &:not(:first-child)::before {
        @include setSeperator(1px, 0, #fbfbfb);
        height: .4rem;
      }
    }
  }
}

// 重点板块
.keystone-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #fff;
  padding: .4rem .3rem .2rem;
  margin: -.1rem 0;
  font-size: 0;
  .keystone-item {
    width: 2.2rem;
    height: 1.93rem;
    padding: 1.03rem 0 0;
    margin: .1rem 0;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    background: no-repeat center/contain;
    .title {
      font-size: .28rem;
      color: #333537;
    }
    .desc {
      font-size: .24rem;
      color: #999999;
    }
  }
}

.home-disease {
  background: $block-bg;
  text-align: center;
  .disease-depart {
    padding: .27rem .23rem 0;
  }
  .disease-all {
    padding: .34rem 0;
    margin-bottom: .2rem;
    position: relative;
    font-size: .28rem;
    color: #0EBC92;
  }
}

// 疾病科室
.depart-list {
  display: flex;
  flex-wrap: wrap;
  margin: -.03rem -.06rem;
  font-size: 0;
  .depart-item {
    width: 1.67rem;
    height: 1.67rem;
    margin: .03rem .06rem;
    position: relative;
    img {
      width: .82rem;
      height: .82rem;
      margin: .21rem 0;
    }
    .title {
      font-size: .24rem;
      color: #333537;
    }
  }
}

// 名家视频
.doctor-video {
  margin: .16rem 0;
  padding-top: .4rem;
  background: $block-bg;
  .more {
    position: relative;
    padding: .34rem 0;
    font-size: .28rem;
    text-align: center;
    color: #0EBC92;
  }
  .wrapper {
    height: 2.86rem + .1rem;
    overflow: hidden;
    @include hideScrollbar();
  }
  .video-list {
    padding: 0 .3rem;
    margin: 0 -.1rem;
    height: 2.86rem + .1rem + .12rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
  }
  .video-item {
    display: inline-block;
    vertical-align: middle;
    width: 3.33rem;
    height: 2.86rem + .1rem;
    border-radius: .10rem;
    margin: 0 .1rem;
    position: relative;
    background: no-repeat center/contain;
  }
  .video-cover {
    position: relative;
    border-radius: .1rem;
    overflow: hidden;
    width: 3.33rem;
    height: 1.87rem;
    img {
      position:absolute;
      top:0;
      bottom:0;
      margin:auto;
      width: 100%;
      height: auto;
    }
    .video-duration {
      position: absolute;
      bottom: .14rem;
      right: .14rem;
      font-size: .18rem;
      color: #fff;
      background: rgba(0, 0, 0, .1);
      border-radius: 1rem;
      padding: .075rem .1rem;
      text-align: center;
      &::before {
        display: inline-block;
        vertical-align: middle;
        content: " ";
        width: .08rem;
        height: .09rem;
        margin: -0.05rem .05rem 0 0;
        background: url(~assets/images/mobile/home/triangle.png) no-repeat center/contain;
      }
    }
  }
  .video-info {
    .title {
      padding: .14rem 0 .08rem;
      font-weight: $font-medium;
      font-size: .28rem;
      color: #303435;
    }
    .name {
      font-size: .26rem;
      color: #404040;
      margin-right: .1rem;
    }
    .disease {
      font-size: .26rem;
      color: #b8bfc4;
      height: .36rem;
      line-height: .36rem;
      padding: 0 .1rem;
      position: relative;
      &:after {
        @include setOnePxBorder(#CCD1D5, .08rem);
      }
    }
  }
}
</style>
