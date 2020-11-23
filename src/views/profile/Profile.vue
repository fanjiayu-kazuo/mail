<template>
  <div class="wrap">
    <h2>我的</h2>
    <ul class="dataWrap">
      <li v-for="(item,index) in listChange" :key="index">
        {{item.name}}
        <span class="top" @click="top(index)">置顶</span>
        <span class="cancleTop" @click="cancleTop(index)">取消置顶</span>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[
          {
              id:0,
              name:"数据1"
          },
          {
              id:1,
              name:"数据2"
          },
          {
              id:2,
              name:"数据3"
          },
          {
              id:3,
              name:"数据4"
          },
          {
              id:4,
              name:"数据5"
          },
        ],
        listChange:[],
      }
    },
    methods: {
      top(idx) {
        var temp =  this.listChange[idx];
        this.listChange.splice(idx,1);
        this.listChange.unshift(temp);
      },
      cancleTop(idx) {
        var saveIndex = this.listChange[idx].id;
        var a = idx;
        this.listChange.splice(a,1);
        this.listChange.splice(saveIndex,0,this.listChange[idx]);
        console.log(a);
        // 
      }
    },
    mounted() {
      this.listChange = this.list;
    }
  }
</script>

<style>
  .dataWrap {
    font-size: 22px;
  }
  .top {
    color: skyblue;
    margin: 0 30px;
  }
  li {
    padding: 20px 0;
    box-sizing: border-box;
  }
</style>
