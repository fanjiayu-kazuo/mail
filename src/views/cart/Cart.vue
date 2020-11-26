<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>

    <!-- 底部汇总 -->
    <CarBottonBar/>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import CartList from './catChildren/cartList.vue'
  import CarBottonBar from './catChildren/cartBottonBar.vue'
  import {
    mapGetters
  } from 'vuex'

  export default {
    components: {
      NavBar,
      CartList,
      CarBottonBar
    },
    computed: {
      //两种写法
      //...mapGetters(['cartLength']),
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped="scoped">
  .cart{
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
</style>
