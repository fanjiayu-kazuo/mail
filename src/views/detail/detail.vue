<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" :pullUpLoad='true' ref='detailScroll' :probe-type="3">
      <detail-swiper :topImage='topImgs' @detailImgLoad='detailImgLoad'></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo='detailInfo' />
      <detail-param-info :paramInfo='paramInfo'/>
      <detail-info :commentInfo="commentInfo"/>
    </scroll>
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
  /*
  引入better scroll
  */
  import Scroll from 'components/common/betterScroll/scroll.vue'
  import {
    getDetail,
    Goods,
    ShopInfo,
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
        commentInfo:{}
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
      Scroll
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
        this.paramInfo= new GoodsParam(data.itemParams.info,data.itemParams.rule);
        if(data.rate.cRate!=0){
          this.commentInfo = data.rate.list[0]
        }
        setTimeout(()=>{
          this.$refs.detailScroll.scroll.refresh();
        },1000);
      })

    },

    methods: {
      detailImgLoad() {
        this.$refs.detailScroll.scroll.refresh();
      },
      imgListUpload() {
        this.$refs.detailScroll.scroll.refresh();
      }
    }
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
    height: calc(100% - 44px);
    margin-bottom: 49px;
  }
</style>
