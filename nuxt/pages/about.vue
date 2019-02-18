<template>
  <div v-cloak id="main" class="container">
    <div class="list-body">
      <div class="banner">
        <div class="t1">传递健康与信赖</div>
        <div class="t2"></div>
      </div>
      <div class="desc">
        <div class="t1">产品介绍</div>
        <div class="t2">致力于向广大网友提供权威可信的医学知识，并提供易于理解的科普解读。</div>
      </div>
    </div>
    {{ testData }}
    <a href="/">跳转看看</a>
    <nuxt-link to="/">关于</nuxt-link>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            testData:  '这是测试的数据，一开始为空'
        }
    },
  components: {
  },
  created () {
  },
  async asyncData ({ store }) {
    // console.log('store', store)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ testData: 'setTimout后面的数据' })
      }, 2000)
    })
    // console.log('www')
    // return {testData: 'wwww'}
  },
  activated () {
  },
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~assets/scss/common-util.scss';
.container{
  background: $background;
  width: 7.5rem;
  margin: 0 auto;
  position: relative;
}
.banner {
  display: block;
  position: relative;
  width: 100%;
  height: 2.6rem;
  background: url(http://s.pc.qq.com/tdf/ydd/about_banner.png) center no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .t1 {
    display: block;
    position: relative;
    width: 100%;
    padding-top: .9rem;
    padding-left: 1.66rem;
    font-size: .4rem;
    line-height: .4rem;
    color: #fff;

  }
  .t2 {
    width: 100%;
    padding-top: .17rem;
    padding-left: 1.66rem;
    font-size: .3rem;
    line-height: .3rem;
    color: #fff;
    opacity: .6;
  }
}
.desc {
  padding: .66rem .32rem;
  background: $block-background;
  box-shadow: $bottom-shadow;
  .t1 {
    font-size: .36rem;
    font-weight: bold;
    color: #0d0d0f;
  }
  .t2 {
    margin-top: .4rem;
    font-size: .3rem;
    color: #676d70;
  }
}
.list-body {
  margin-top: .88rem;
}
.searcher-box .searcher .tab-list {
    font-size: .36rem;
    position: absolute;
    top: 0;
    left: 0;
    line-height: .88rem;
    text-align: center;
    width: 100%;
    color: #3e464a;
}
  .searcher-box .searcher .tab-list .search-menu {
    position: absolute;
    top: .26rem;
    left: .32rem;
    width: .31rem;
    height: .35rem;
    background: url(~assets/images/mobile/common/search-back.png) no-repeat center;
    background-size: contain;
}
</style>
