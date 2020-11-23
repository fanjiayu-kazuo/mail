import BackTop from '../components/content/backTop/BackTop.vue'
export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      showbackbotton: false
    }
  },
  methods: {
    backClick() {
      this.$refs.detailScroll && this.$refs.detailScroll.scroll.scrollTo(0, 0, 1000);
    },
  }
}
