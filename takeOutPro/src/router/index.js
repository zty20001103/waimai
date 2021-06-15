import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "../components/Home";
import Login from "../components/Login";
import User from "../components/User";
import Search from "../components/Search"
import Detailpage from "../components/Detailpage";
import Order from "../components/Order";
import Appraise from "../components/Appraise";
import Merchant from "../components/Merchant";
// import Register from "../components/Register";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',   //默认加载主页面
      component: Home
    },
    {
      path:'/home',   //主页面
      component: Home
    },
    {//登陆与注册
      path: '/login',
      component: Login,
      props: true,
      name:'login'
    },
    {          //个人中心
      path: '/user',
      name: 'user',
      component: User,
      props: true
    },
    {        //搜索页面
      path:'/search',
      component: Search,
    },
    {     //详情页
      path: '/detailpage/:id',
      component: Detailpage,
      props: true
    },
    {   //订单
      path: '/order',
      component: Order
    },
    {     //商家评价页面
      path: "/appraise",
      component: Appraise
    },
    {
      path: '/merchant',
      component: Merchant
    },
  ]
})
