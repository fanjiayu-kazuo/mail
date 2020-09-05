<template>
    <SwiperSlide>
       <slot></slot>
     </SwiperSlide>
</template>

<script>
  import {SwiperSlide} from "vue-awesome-swiper"
	export default {
		name: "Slide",
    components:{
      SwiperSlide
    }
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }


</style>
