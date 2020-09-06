<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" />
        {{item.title}}
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding-top: 10px;
    padding-bottom: 15px;
    border-bottom: 0.5rem solid #eee;
  }
  .recommend-item{
    flex: 1;

  }
  .recommend img {
    width: 100%;
    padding-left: 5px;
    padding-right: 2px;
  }
</style>
