<template>
  <div id="home">
    <nav-bar class='home-nav'>
      <div slot="center">首页</div>
    </nav-bar>
    <Scroll class="warpper" ref='scroll' :pullUpLoad='true' :probe-type="3" @ScorllPosition='ScorllPosition' @pullingUp='loadMore'>
      <home-swiper :banners='banners' />
      <home-recommend :recommends='recommends' />
      <home-featuer />
      <table-countrol :titles='["流行","新款","精选"]' class='tab_control' @tabClick="tabClick" />
      <goods-list :goods='showTypeGoods'></goods-list>
    </Scroll>
    <back-top @click.native='backClick' v-show="showbackbotton" />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'   //导航组件
  import HomeSwiper from './childComps/HomeSwiper.vue'       //首页跑马灯
  import HomeRecommend from './childComps/HomeRecommend.vue' 
  import HomeFeatuer from './childComps/HomeFeatuer.vue'
  import GoodsList from "components/content/goods/GoodsList.vue"
  import Scroll from 'components/common/betterScroll/scroll.vue'
  import TableCountrol from 'components/content/tabControl/tabControl.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'
  import {
    getHomeMultidata,
    getHomeGoods
  } from '../../network/Home.js'

  export default {
    data() {
      return {
        banners: [],
        recommends: [],
        /*商品列表*/
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        courrentType: 'pop',
        scroll: null,
        showbackbotton: false
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeatuer,
      TableCountrol,
      GoodsList,
      Scroll,
      BackTop,

    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
      this.ListenImgUpLoad();
    },
    mounted() {

    },
    computed: {
      /*
      *返回当前选择的列表数据
      **/
      showTypeGoods() {
        return this.goods[this.courrentType].list;
      }
    },
    methods: {
      /*事件监听 */
      tabClick(index) {
        switch (index) {
          case 0:
            this.courrentType = 'pop';
            break;
          case 1:
            this.courrentType = 'new';
            break;
          case 2:
            this.courrentType = 'sell'
            break;
        }
      },
      ListenImgUpLoad(){
        this.$bus.$on('imgUpLoad', () => {
          this.$refs.scroll && this.$refs.scroll.scroll.refresh()
        })
      },
      /*
       *返回到最上层
       */
      backClick() {
        this.$refs.scroll && this.$refs.scroll.scroll.scrollTo(0, 0, 1000);
      },
      /*
       *position 当前滚动条的滚动坐标
       * 设置当前的回到首页的图标是否显示
       * */
      ScorllPosition(position) {
        this.showbackbotton = -position.y > 500;

      },
      /*
       *下拉加载更多
       */
      loadMore() {
        console.log('more');
        this.getHomeGoods(this.courrentType);
        //console.log(this.courrentType);
        this.$refs.scroll.scroll.finishPullUp();


      },
      /*网络请求*/
      /*
       *获取跑马灯的图片和推荐的4个图标
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          if (res && res.data && res.data.banner && res.data.recommend) {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          }
        })
      },
      /*
       * 获取商品列表  每页30条数据
       */
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {

          this.goods[type].list.push(...res.data.list);
          this.goods[type].page++;

        }).catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.$nextTick(this.ListtenScroll)
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    position: relative;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }

  .tab_control {
    /* position: sticky; */
    top: 44px;
    background-color: #FFFFFF;
    z-index: 9;
  }

  .warpper {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
