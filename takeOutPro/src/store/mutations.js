const mutations={
//  登陆成功后保存用户名，密码，姓名
mutationsLogin:function (state,payload) {
    state.name = payload
    state.loingStateus = true
},
//退出登录
  mutationsLoginout:function (state){
    state.name = ""
    state.loingStateus = false
  },
//  保存点开的商家信息
  mutationsMerchant:function(state,payload){
    state.merchant = payload
  },
//  保存购物车的商品
  mutationsShopping:function (state,payload) {
    state.shopping=payload
    console.log(payload)
  },
  //添加新的商品
  mutationsPush:function(state,payload){
      state.shopping.push(payload)
  },
  //商品加一
  mutationsplus:function (state,payload) {
    // console.log(payload.id)
    for (var i =0;i<state.shopping.length;i++){
      if (payload.id == state.shopping[i].id){
        state.shopping[i].list[0].buyCount++
      }
    }
  },
//  商品减一  若商品数量等于0则删除商品
  mutationsMinus:function (state,payload) {
    for (var i =0;i<state.shopping.length;i++){
      if (payload == state.shopping[i].id){
        console.log(i)
        state.shopping.splice(i,1)
      }
    }
  },
//  商品减一 若商品数量不小于0 则购买的商品数量减一
  mutationsMinus2:function (state,payload) {
    for (var i =0;i<state.shopping.length;i++){
      if (payload == state.shopping[i].id){
        state.shopping[i].list[0].buyCount--
      }
    }
  }

};
export default mutations
