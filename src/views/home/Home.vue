<template>
  <div id="home">
    <nav-bar class='home-nav'>
      <div slot="center">首页</div>
    </nav-bar>
    <Scroll class="warpper" ref='scroll' :pullUpLoad='true' :probe-type="3" @ScorllPosition='ScorllPosition' @pullingUp='loadMore'>
      <home-swiper :banners='banners' @SwiperImgLoad='SwiperImgLoad' />
      <home-recommend :recommends='recommends' />
      <home-featuer />
      <table-countrol :titles='["流行","新款","精选"]' @tabClick="tabClick" ref='tabCountrolfirst' />
      <goods-list :goods='showTypeGoods'></goods-list>
    </Scroll>
    <table-countrol :titles='["流行","新款","精选"]' @tabClick="tabClick" class="Imbibition" ref='tabCountrolSecond' v-show="showContrue" />

    <back-top @click.native='backClick' v-show="showbackbotton" />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue' //导航组件
  import HomeSwiper from './childComps/HomeSwiper.vue' //首页跑马灯
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
        showbackbotton: false,
        handler: null,
        tabOffsetTop: 0,
        showContrue: false,
        save_y: 0
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
      //this.ListenImgUpLoad();
    },
    activated() {
      this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(0, this.save_y, 0);
      this.$refs.scroll.scroll && this.$refs.scroll.scroll.refresh();
    },
    deactivated() {
      //this.$refs.scroll
    },
    mounted() {
      this.ListenImgUpLoad();
      // this.ListenImgUpLoad()
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
        /*
         *改变两个的index
         */
        this.$refs.tabCountrolfirst.countIndex = index;
        this.$refs.tabCountrolSecond.countIndex = index;

      },
      /*
       * 监听商品的list加载并且设置防抖
       **/
      ListenImgUpLoad() {
        this.$bus.$on('imgUpLoad', () => {
          if (this.handler) {
            clearTimeout(this.handler);
          }
          this.handler = setTimeout(() => {
            this.$refs.scroll && this.$refs.scroll.scroll.refresh();
          }, 200)
        })
      },
      SwiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabCountrolfirst.$el.offsetTop;
        // console.log( this.$refs.tabCountrol.$el.offsetTop);
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
        this.showbackbotton = (-position.y) > 500;
        // console.log(-position.y +'   '+ this.tabOffsetTop);
        this.showContrue = (-position.y) > this.tabOffsetTop;
        this.save_y = position.y

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
      /*
       *防抖
       **/
      debounce(func, delay) {
        console.log('454545');
        var timer = null;
        return function(...args) {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            func();
            console.log(fun);
          }, delay)
        }
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
    }
  }
</script>

<style scoped>
  #home {

    position: relative;
    height: 100vh;
  }

  .home-nav {
    position: relative;
    background-color: var(--color-tint);

    z-index: 9;
  }

  .tab_control {
    z-index: 9;
    background-color: #FFFFFF;
  }

  .warpper {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .Imbibition {
    position: relative;
    z-index: 9;
    background-color: #FFFFFF;
  }
</style>
