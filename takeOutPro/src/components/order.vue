<template>
    <div>
      <div class="header">
        <van-nav-bar title="订单列表"   style="background: #00A67C;"/>
      </div>
      <!--    登陆后的  tab切换-->
      <van-tabs v-if="loginON"  v-model="active">
        <!--        外卖订单的内容-->
        <van-tab title="外卖订单">
          <div style="margin-bottom: 50px">
            <van-card
              thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
              style="text-align: left"
              v-for="(item,i) in 8"
              :key="i"
            >
              <template #desc>
                <p style="margin-top: 15px"> <b>骄龙豆捞 > </b> </p>
              </template>
              <template #price>
                <p>酸辣土豆丝等2件商品</p>
              </template>
              <template #footer>
                <van-button plain type="default" size="mini" style="border-radius: 20px">删除订单</van-button>
                <van-button plain type="primary" size="mini" style="border-radius: 20px">再来一单</van-button>
              </template>
            </van-card>
          </div>
        </van-tab>

        <!--        待评价的内容-->
        <van-tab title="待评价"></van-tab>
        <van-tab title="退款"></van-tab>
        <van-tab title="其他订单"></van-tab>
      </van-tabs>
<!--      没有登陆给予提示-->
      <div v-else >
        <van-empty  description="抱歉，您还没有登陆" >
          <template #default>
            <a style="color: red" :href="'#/login'"> 点击前去登录 </a>
          </template>
        </van-empty>
      </div>


      <foo></foo>
    </div>
</template>

<script>
  import foo from "./foo";
    export default {
        name: "Order",
      components:{
        "foo":foo
      },
      data() {
        return {
          active: 0,//默认显示
          loginON:""
        };
      },

      methods: {

      },
      created() {
        var loingStateus= window.localStorage.getItem("loingStateus")
        this.loginON = loingStateus
      }
    }
</script>

<style scoped>
.header /deep/ *{
  color: #ffffff;
}

</style>
