<template>
  <div v-cloak class="container">
    <div v-cloak id="main">
      <div class="cancer-wrapper">
        <!-- <active-banner v-if="activeOps" :options="activeOps" class="cancer-activity" /> -->

        <div class="cancer-committee" @click="toCommittee()">
          两院院士, 肿瘤领域权威专家, 头部医疗机构编撰<br> 精选全球领先的医疗科普网站
          <img :src="require('src/assets/images/mobile/home_cancer/webmd.png')">优质内容        </div>
        <div :class="{more:cancerList.length>5, 'list-gray': cancerList.length%4 === 1}" class="cancer-list">
          <div v-for="(item,index) in cancerList" :key="index" class="cancer-item" @click="toCancer(item)">
            <div class="info">
              <p class="name">{{ item.name }}</p>
              <p v-if="item.ename" class="desc">{{ item.ename }}</p>
            </div>
            <img v-if="item.icon" :src="item.icon">
          </div>
        </div>
        <div class="disease-more" @click="toMore()">其它疾病</div>
      </div>
    </div>
  </div>
</template>

<script>
import homeCancer from './home_cancer'
export default homeCancer
</script>

<style lang="scss" scoped>
@import "./home_cancer.scss";
</style>
