<template>
  <div class="botton-bar">
    <div class="selectAll_div">
      <CheckButton class="selectAll" />
      <span>全选</span>
    </div>
    <div class="total">
      合计:￥{{totalPrice|fomate(2)}}
    </div>
    <div class="calc">
      去计算（{{checkedLength}}）
    </div>
  </div>
</template>

<script>
  import CheckButton from './checkButton.vue'
  export default {
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.state.carList.filter(item => {
          return item.isChecked;
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
      },
      checkedLength(){
        return this.$store.state.carList.filter(item => {
          return item.isChecked;
        }).length
      }
    },
    filters: {
      fomate(s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
          r = s.split(".")[1];
        var t = "";
        for (let i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      }
    }
  }
</script>

<style scoped="scoped">


  .botton-bar {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding-left: 10px;
    background-color: #F2F5F8;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: rgba(0, 0, 5, 0.5);
  }

  .botton-bar .selectAll_div {
    width: 75px;
    line-height: 40px;
  }

  .botton-bar .selectAll {
    height: 20px;
    line-height: 17px;
    display: inline-block;
  }

  .botton-bar div span {
    color: #00000;
    font-family: 微软雅黑;
    letter-spacing: 3px;
  }

  .total {
    line-height: 40px;
    text-align: center;
  }

  .calc {
    background-color: var(--color-tint);
    line-height: 40px;
    text-align: center;
    width: 90px;
  }
</style>
