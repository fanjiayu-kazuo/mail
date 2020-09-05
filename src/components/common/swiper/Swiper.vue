<template>
  <swiper :options="swiperOption">
    <!-- 添加的图片 -->

    <slot></slot>
    <!-- 指示点 -->
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- 左右导航栏 -->
    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div> -->
  </swiper>
</template>

<script>
  import SwiperSlide from "./SwiperItem.vue"
  import {
    Swiper
  } from "vue-awesome-swiper"
  import 'swiper/dist/css/swiper.css';
  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false,
          loop: true,
          observer: true
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    width: .18rem;
    height: .08rem;
    border-radius: 0;
    background-color: #FF5777;
  }
</style>
