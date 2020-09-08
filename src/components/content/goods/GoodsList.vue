<template>
  <div class="goods-box">
    <GoodsListItem v-for="(item,index) in goods" :key='index' :item='item' />
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem.vue"
  export default {
    props: {
      goods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped="scoped">
  .goods-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-left: 0.5px;
    padding-right: 0.5px;
  }
</style>
