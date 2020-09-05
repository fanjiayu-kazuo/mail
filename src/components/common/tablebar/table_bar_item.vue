<template>
  <div class="table_bar_item" :class="{'choose':ischoose}" @click="choose">
    <slot name="bar_img"></slot>
    <slot name="bar_txt"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      path: String,
    },
    computed:{
      ischoose(){
        return this.$route.path.indexOf(this.path)!==-1;
      }
    },
    methods: {
      choose() {
        this.$router.replace(this.path).catch(e=>e);
      }
    }
  }
</script>

<style>
  .table_bar_item {
    left: 0px;
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .bar_img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }

  .choose {
    background-color: darkgrey;

  }
</style>
