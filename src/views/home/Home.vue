<template>
  <div id="home">
    <NavBar class='home-nav'>
      <div slot="center">首页</div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from'components/common/navbar/NavBar.vue'
  export default{
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
</style>
