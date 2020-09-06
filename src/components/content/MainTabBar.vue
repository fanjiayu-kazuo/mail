<template>
  <TableBar>
    <TableBarItem path='/home'>
      <img slot='bar_img' src="~assets/img/shouye.png" class="bar_img" />
      <div slot="bar_txt">首页</div>
    </TableBarItem>
    <TableBarItem path='/category'>
      <img slot='bar_img' src="~assets/img/fenlei.png" class="bar_img" />
      <div slot="bar_txt">分类</div>
    </TableBarItem>
    <TableBarItem path='/cart'>
      <img slot='bar_img' src="~assets/img/gouwuche.png" class="bar_img" />
      <div slot="bar_txt">购物车</div>
    </TableBarItem>
    <TableBarItem path='/profile'>
      <img slot='bar_img' src="~assets/img/wode.png" class="bar_img" />
      <div slot="bar_txt">我的</div>
    </TableBarItem>
  </TableBar>
</template>

<script>
  import TableBarItem from '../common/tablebar/table_bar_item.vue'
  import TableBar from '../common/tablebar/tabbar.vue'
  export default {
    components: {
      TableBarItem,
      TableBar
    }
  }
</script>

<style>
</style>
