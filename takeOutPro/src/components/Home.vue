<template>
  <div>
    <van-nav-bar title="正在定位" right-text="登录|注册" left-arrow fixed=true click="login.vue">
      <template #left>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-row type="flex" justify="space-around">
      <van-col span="4">span: 6</van-col>
      <van-col span="4">span: 6</van-col>
      <van-col span="4">span: 6</van-col>
      <van-col span="4">span: 6</van-col>
    </van-row>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home-o">外卖</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="bill-o">订单</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { NavBar, Col, Row} from 'vant';
  Vue.use(NavBar);
  Vue.use(Col);
  Vue.use(Row);
  export default {
    name:"home",
    data(){
      return{
        active:0
      }
    },

  }
</script>
