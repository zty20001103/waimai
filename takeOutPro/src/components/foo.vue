<template id="foo">
    <footer>
      <van-tabbar v-model="active" fixed  @change="Foochange(active)">
        <van-tabbar-item icon="home-o" to="/home" >外卖</van-tabbar-item>
        <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
        <van-tabbar-item icon="bill-o" to="/order">订单</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/user" >我的</van-tabbar-item>
      </van-tabbar>
    </footer>
</template>

<script>
  import {mapMutations,mapState} from "vuex"
  export default {
    name: 'foo',
    props:['foo'],
    data () {
      return {
        active:0,
      }
    },
    methods:{
      ...mapMutations(['mutationsSubscript']),
      Foochange(res){

        window.localStorage.setItem("subscript",res);
      },
    },
     created(){
        var sub= parseInt(localStorage.getItem("subscript"))
        this.active=sub
     },
  }
</script>

<style scoped>

</style>
