<template>
  <!-- 轮播图 -->
  <div v-if="list && list.length && swiperOps" class="banner-container">
    <img v-if="list.length === 1 && list[0].image" :src="list[0].image" class="banner-img" @click="toBanner(list[0], 0)">
    <!-- <swiper v-else-if="list.length > 1" :options="swiperOps" :class="(options.area || '') + '_swiper'">
      <swiper-slide v-for="(banner, index) in list" v-if="banner.image" :key="index">
        <img :src="banner.image" class="banner-img" @click.stop="toBanner(banner, index)">
      </swiper-slide>
    </swiper> -->

    <div  v-else-if="list.length > 1" v-swiper:mySwiper="swiperOps" :class="(options.area || '') + '_swiper'">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner, index) in list" v-if="banner.image" :key="index">
          <img :src="banner.image" class="banner-img" @click.stop="toBanner(banner, index)">
        </div>
      </div>
    </div>

    <div v-if="list.length > 1" class="banner-pagination">
      <span v-for="(banner, index) in list" :key="index" :class="{active: bannerIdx === index}" class="banner-bullet" />
    </div>
  </div>
</template>

<script>
import banner from './banner'
export default banner
</script>

<style lang="scss" scoped src="./banner.scss" />
