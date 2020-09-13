<template>
  <div class="detail-swiper">
    <Swiper>
      <SwiperItem v-for='(item,index) in topImage' :key='index' class='detail-swiper_item'>
        <img :src="item" alt="正在加载" @load="detailImgLoad"/>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import {
    Swiper,
    SwiperItem
  } from "components/common/swiper/index.js"

  export default {
    props: {
      topImage: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      detailImgLoad(){
        this.$emit('detailImgLoad');
      }
    }

  }
</script>

<style>
  .detail-swiper_item{
    height: 375px;
    overflow: hidden;
    text-align: center;
  }
  .detail-swiper_item img{
    width: 375px;
    /* height: 375px; */
  }
</style>
