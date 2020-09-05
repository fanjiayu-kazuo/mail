<template>
  <div id="home">
    <NavBar class='home-nav'>
      <div slot="center">首页</div>
    </NavBar>
    <HomeSwiper :banners='banners'></HomeSwiper>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import {
    getHomeMultidata
  } from '../../network/Home.js'

  export default {
    data() {
      return {
        banners: [],
        recommends: [],
      }
    },
    components: {
      NavBar,
      HomeSwiper
    },
    created() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend;
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
</style>
