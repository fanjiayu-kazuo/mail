<template>
  <div class="check-button" :class="{chick:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    props: {
      isChecked: {
        type: Boolean,
        default () {
          return true;
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .check-button {
    background-color: #FFFFFF;
    border: 2px solid #CCCCCC;
    border-radius: 50%;
    transform: scale(0.9);
    box-sizing: border-box;
  }

  .check-button img {
    vertical-align: middle;
  }

  .chick {
    border: 2px solid #FFFFFF;
    background-color: red;
  }
</style>
