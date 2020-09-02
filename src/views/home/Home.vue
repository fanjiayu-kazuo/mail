<template>
  <div id="home">
    <NavBar class='home-nav'>
      <div slot="center">首页</div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from'components/common/navbar/NavBar.vue'
  import {getHomeMultidata} from '../../network/Home.js'
  export default{
    data(){
      return {
        banners:[],
        recommends:[],
      }
    },
    components:{
      NavBar
    },
    created() {
      getHomeMultidata().then( res=>{
        this.banners = res.data.banner;
        this.recommends = res.data.recommend;
      })

    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
</style>
