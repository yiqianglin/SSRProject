<template>
  <div class="container">
    <div class="home-header">
      <!-- 顶部运营位 -->
      <active-banner v-if="activeOps && activeOps.list.length" :options="activeOps" />
      <span :class="{update: redpointState}" class="icon-my" @click="toMy" />
      <div class="home-search">
        <div class="search-btn" @click="toSearch">
          <span>搜疾病／症状／文章sss</span>
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
    <test-comp :dt="departList"></test-comp>
  </div>
</template>

<script>
import home from './home'
export default home
</script>

<style lang="scss" scoped src="./home.scss"></style>
