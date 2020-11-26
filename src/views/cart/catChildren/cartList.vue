<template>
  <div class="cart-list">
    <Scroll class="warper" :probeType="3" :pullUpLoad='true' ref="listScroll">
      <list-item v-for="(item,index) in list" :key="index" :product="item"></list-item>
    </Scroll>

  </div>
</template>

<script>
  import Scroll from '../../../components/common/betterScroll/scroll.vue'
  import ListItem from './listItem.vue'
  import {
    mapGetters
  } from 'vuex'

  export default {
    components: {
      Scroll,
      ListItem
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.listScroll && this.$refs.listScroll.scroll && this.$refs.listScroll.scroll.refresh();
      })
    },
    computed: {
      ...mapGetters({
        list: 'carList'
      })
    },
    activated() {
      this.$refs.listScroll && this.$refs.listScroll.scroll && this.$refs.listScroll.scroll.refresh();
    }
  }
</script>

<style scoped="scoped">
  .cart-list {
    height: calc(100vh - 44px - 49px - 40px);
  }

  .warper {
    height: 100%;
    overflow: hidden;
  }
</style>
