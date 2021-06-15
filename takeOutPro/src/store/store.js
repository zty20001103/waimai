import Vue from "vue";
import Vuex from "vuex"
import mutations from "./mutations";

Vue.use(Vuex);
const store = new Vuex.Store({

  state:{
    name:'',   //存储用户名，密码 姓名等信息
    shopping:"", //购物车的数据
    merchant:"", //商家详情信息
    loingStateus:false,  //用户是否登陆
  },

  getters:{
  //    拿到所购买商品的数量，
    gettersAmount(state){
      var t= 0
        for (var i = 0;i<state.shopping.length;i++){
          var  list = state.shopping[i].list;
          // return list[i].buyCount
            for (var l=0;l<list.length;l++){
                t+=list[l].buyCount
            }
        }
      return t
    },
  },
  mutations,

})

export default store
