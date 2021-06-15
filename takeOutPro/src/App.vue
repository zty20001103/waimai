<template>
  <div id="app">

<!--    输出组件-->
    <router-view></router-view>

  </div>

</template>



<script>
  import Vue from "vue"
  import {mapMutations} from "vuex"
export default {
  name: 'App',
  methods:{
    ...mapMutations(['mutationsLogin'])
  },
  created() {
    // 获取长期存储的数据
    var loingStateus= window.localStorage.getItem("loingStateus")
    if (loingStateus){  //若为true就为登陆状态
      var allname= window.localStorage.getItem("allname")
       var allname=  JSON.parse(allname)
      this.mutationsLogin(allname)   //登陆成功后，保存数据到state
    }

  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
