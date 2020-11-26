<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="detailnav" />
    <scroll  class="content" :pullUpLoad='true' ref='detailScroll' :probe-type="3" @ScorllPosition="ScorllPosition">
      <detail-swiper :topImage='topImgs' @detailImgLoad='detailImgLoad'></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo='detailInfo' />
      <detail-param-info ref='param' :paramInfo='paramInfo' />
      <detail-info ref='comment' :commentInfo="commentInfo" />
      <goods-list ref='list' :goods='recommends' />
    </scroll>
    <back-top @click.native='backClick' v-show="showbackbotton" />
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from './detailChildren/detailNavBar.vue'
  import DetailSwiper from './detailChildren/detailSwiper.vue'
  import DetailBaseInfo from './detailChildren/detailBaseInfo.vue'
  import DetailShopInfo from './detailChildren/detailShopInfo.vue'
  import DetailGoodsInfo from './detailChildren/detailGoodsInfo.vue'
  import DetailParamInfo from './detailChildren/detailParamInfo.vue'
  import DetailInfo from './detailChildren/detailInfo.vue'
  import GoodsList from '../../components/content/goods/GoodsList.vue'
  import detailBottomBar from './detailChildren/detailBottomBar.vue'
  import {
    backTopMixin
  } from '../../common/mixin.js'
  /*
  引入better scroll
  */
  import Scroll from 'components/common/betterScroll/scroll.vue'
  import {
    getDetail,
    Goods,
    ShopInfo,
    getRecommend,
    GoodsParam
  } from '../../network/detail.js'
  export default {
    name: "detail",
    data() {
      return {
        itemid: null,
        topImgs: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        scrollToYs: [],
        handler: null,
        itemImgListener: null,
        currentIndex: 0
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailInfo,
      GoodsList,
      Scroll,
      detailBottomBar
    },
    created() {
      this.itemid = this.$route.params.iid;
      getDetail(this.itemid).then(res => {
        const data = res.result;
        this.topImgs = res.result.itemInfo.topImages;
        //商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        this.$bus.$emit('dataInfoUpdata');
        //店铺信息
        this.shop = new ShopInfo(data.shopInfo);

        this.detailInfo = data.detailInfo;
        //参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      getRecommend().then(res => {
        this.recommends = res.data.list;
        //console.log(this.recommends);
      })

      this.itemImgListener = () => {
        if (this.handler) {
          clearTimeout(this.handler);
        }
        this.handler = setTimeout(() => {
          this.$refs.detailScroll.scroll.refresh();
          this.scrollToYs = [];
          this.scrollToYs.push(0);
          this.scrollToYs.push(this.$refs.param.$el.offsetTop);
          this.scrollToYs.push(this.$refs.comment.$el.offsetTop);
          this.scrollToYs.push(this.$refs.list.$el.offsetTop);
          console.log(this.scrollToYs);
        }, 200)
      }
    },
    mixins: [backTopMixin],
    methods: {
      detailImgLoad() {
        this.$refs.detailScroll.scroll.refresh();
      },
      imgListUpload() {
        this.$refs.detailScroll.scroll.refresh();
      },
      titleClick(index) {
        console.log(index);
        this.$refs.detailScroll.scroll.scrollTo(0, -this.scrollToYs[index], 300);
      },
      ScorllPosition(position) {
        this.showbackbotton = (-position.y) > 500;
        var saveY = -position.y;
        for (let i = 0; i < this.scrollToYs.length; i++) {
          if (this.currentIndex != i && (i < this.scrollToYs.length - 1)) {
            if (saveY >= this.scrollToYs[i] && saveY < this.scrollToYs[i + 1]) {
              this.currentIndex = i;
              this.$refs.detailnav.currentIndex = this.currentIndex
            }
          } else {
            if (this.currentIndex != i && saveY >= this.scrollToYs[i]) {
              this.currentIndex = i;
              this.$refs.detailnav.currentIndex = this.currentIndex
            }
          }
        }
      },
      addToCart(){
        const product = {}
        product.image = this.topImgs[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.nowPrice;
        product.iid = this.itemid;
        this.$store.dispatch('addCart',product);
        console.log(this.$store.state.carList);
      }
    },
    mounted() {
      this.$bus.$on('imgUpLoad', this.itemImgListener);

    },
    destroyed() {
      this.$bus.$off('imgUpLoad', this.itemImgListener);
    },
  }
</script>

<style scoped="scoped">
  .detail {
    position: relative;
    height: 100vh;
    z-index: 10;
    background-color: #FFFFFF;
  }

  .detail-nav {
    position: relative;
    background-color: #FFFFFF;
    z-index: 9;
  }

  .content {
    height: calc(100% - 44px - 49px);
    margin-bottom: 49px;
  }
</style>
