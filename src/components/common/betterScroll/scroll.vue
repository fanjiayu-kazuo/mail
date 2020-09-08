<template>
  <div class="bscroll" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from "better-scroll"
  export default {
    props: {
      /*
       * 传递滚动响应类型 0 、1 为 不触发滚动事件，3为可以响应滚动事件
       * */
      probeType: {
        type: Number,
        default () {
          return 0;
        }
      },
      /*
       *传递下拉加载，默认为不触发
       * */
      pullUpLoad: {
        type: Boolean,
        default () {
          return false;
        }
      }
    },
    data() {
      return {
        scroll: null,
        handler: null
      }
    },
    mounted() {
      if (!this.$refs.wrapper) {
        return
      }
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })
        this.scroll.on('scroll', position => {
          if (position.y <= -200) {
            this.$emit('ScorllPosition', position)
          }
        })
        this.scroll.on('pullingUp', () => {
          if (this.handler != null) {
            clearTimeout(this.handler);
          }
          this.handler = setTimeout(() => {
            this.$emit('pullingUp');
            this.scroll.refresh();
            this.handler = null
          }, 1000);
        })
      })

    }
  }
</script>
<style scoped>

</style>
