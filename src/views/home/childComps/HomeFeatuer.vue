<template>
  <div class="featuer">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" alt="加载失败">
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        default () {
          return ''
        }
      }
    }
  }
</script>

<style>
  .featuer img {
    width: 100%;
  }
</style>
