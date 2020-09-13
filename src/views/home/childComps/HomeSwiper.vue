<template>
  <Swiper>
    <SwiperItem v-for="(item,index) in banners" :key='index'>
      <a :href="item.link">
        <img :src="(item.image)" width="100%" alt="无法加载" @load="SwiperImgLoad" />
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {
    Swiper,
    SwiperItem
  } from 'components/common/swiper/index.js'
  export default {
    props: {
      banners: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        isload: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      SwiperImgLoad() {
        if (!this.isload) {
          this.isload = true
          this.$emit("SwiperImgLoad");
        }
      }
    },
  }
</script>

<style>
</style>
