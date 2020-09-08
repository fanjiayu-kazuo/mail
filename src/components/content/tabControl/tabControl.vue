<template>
  <div class="tabControl">
    <div v-for="(item,index) in titles" :key='index' class="tabControl-item" :class="{active:index===countIndex}"
      @click="changeIndex(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      titles: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        countIndex: 0
      }
    },
    methods: {
      changeIndex(index) {
        this.countIndex = index;
        this.$emit("tabClick", index);
      }
    }
  }
</script>

<style>
  .tabControl {
    display: flex;
    text-align: center;
    font-size: 15px;
  }

  .tabControl-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }

  .active {
    color: var(--color-high-text);

  }

  .active span {
    padding-bottom: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>
