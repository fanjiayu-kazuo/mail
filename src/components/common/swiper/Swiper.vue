<template>
  <swiper :options="swiperOption">
    <slot></slot>
    <div class="swiper-pagination" slot="pagination"></div>
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
          loop: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false,
          observer: true,
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
        }
      }
    }
  }
</script>

<style scoped>

</style>
