import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
var Home = ()=>import("views/home/Home.vue")
var Category = ()=>import("views/category/Category.vue")
var Cart = ()=>import("views/cart/Cart.vue")
var Profile = ()=>import("views/profile/Profile.vue")
var Detail = ()=>import("views/detail/detail.vue")
export default new Router({
  routes: [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home,
      mate:{
        title:'主页'
      }
    },
    {
      path:'/category',
      component:Category,
      mate:{
        title:'分类'
      }
    },
    {
      path:'/cart',
      component:Cart,
      mate:{
        title:'购物车'
      }
    },
    {
      path:'/profile',
      component:Profile,
      mate:{
        title:'我的'
      }
    },
    {
      path:'/detail/:iid',
      component:Detail,
      mate:{
        title:'详情'
      }
    }
  ],
  mode:"history"
})
