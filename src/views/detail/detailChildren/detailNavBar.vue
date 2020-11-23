<template>
  <div class="detailnavbar">
    <nav-bar>
      <div slot="left" @click="goHome">
        <img src="../../../assets/img/common/back.svg" alt="显示异常" >
      </div>
      <div slot="center" class="title">
        <div v-for="(title,index) in titles" class="title-item"
        :class="{active:index===currentIndex}"
        @click="changeIndex(index)">{{title}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar.vue"
  export default {
    data() {
      return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      changeIndex(index) {
        this.currentIndex = index;
        this.$emit('titleClick',index);
      },
      goHome(){
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 13px;
  }

  .active {
    color: var(--color-high-text);
  }
.detailnavbar img{
  margin-top: 12px;
}
</style>
