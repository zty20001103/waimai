<template>
    <div>

<!--      登陆后显示的内容-->
      <div v-if="loingStateus">
<!--        头部-->
        <div class="header">
          <van-nav-bar title="我的"   style="background: #00A67C; "/>
          <van-contact-card type="edit" :name="name.name" tel="13000000000"  />
        </div>
      <!-- 优惠券，积分，余额 -->
      <div>
        <van-grid column-num="3">
          <van-grid-item >
            <h2 class="grid-item1-p"> 0.00 <span>元</span>  </h2>
            <p class="grid-item1-p1">我的余额</p>
            </van-grid-item>
          <van-grid-item >
            <h2 class="grid-item2-p"> 0 <span>个</span>  </h2>
            <p class="grid-item1-p1">我的优惠券</p>
          </van-grid-item>
          <van-grid-item >
            <h2 class="grid-item3-p"> 0.00 <span>分</span>  </h2>
            <p class="grid-item1-p1">我的积分</p>
          </van-grid-item>
        </van-grid>
      </div>
      <!--  -->
      <div>
            <ul class="list-ul">
              <li>
                <van-nav-bar >
                  <template #left>
                    <van-icon name="bill-o"  /> <b><a :href="'#/order'">我的订单</a></b>
                  </template>

                  <template #right>
                      <van-icon name="arrow"  />
                  </template>
                </van-nav-bar>
              </li>
              <li>
                <van-nav-bar >
                  <template #left>
                   <van-icon name="points" /> <b>积分商城</b>
                  </template>

                  <template #right>
                      <van-icon name="arrow"  />
                  </template>
                </van-nav-bar>
              </li>
              <li>
                <van-nav-bar >
                  <template #left>
                   <van-icon name="medal-o" /> <b>{{name.name}}的外卖会员卡</b>
                  </template>

                  <template #right>
                      <van-icon name="arrow"  />
                  </template>
                </van-nav-bar>
              </li>
              <li>
                <van-nav-bar >
                  <template #left>
                   <van-icon name="hotel-o" /> <b>服务中心</b>
                  </template>

                  <template #right>
                      <van-icon name="arrow"  />
                  </template>
                </van-nav-bar>
              </li>
            </ul>
      </div>

      <div style="margin-top:60px">
        <b>The past is gone, the future is gone</b>
        <p style="color:#ccc">往事不再过问，未来共赴前程</p>
      </div>
      </div>
<!--      没有登陆显示的内容，提示登陆-->
      <div v-else>
        <van-empty image="error" description="抱歉，您还没有登陆" >
          <template #default>
            <a :href="'#/login'" style="color:red"> 点击前去登录 </a>
          </template>
        </van-empty>
      </div>
        <foo></foo>
    </div>
</template>



<script>
  import {mapState} from "vuex"
  import foo from "./foo";
    export default {
        name: "User",
        props:['names'],
      components:{
          "foo":foo
      },
      computed:{
        ...mapState(['name','loingStateus'])
      },
    }
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}


.header /deep/ *{
  color: #ffffff;
}
.header /deep/ .van-nav-bar__content{
    border-bottom: 2px solid #33FFFF;
  }
  .header /deep/ .van-contact-card{
    border: 0;
    padding: 20px 10px ;
    background: #00A67C;
    position:static
  }
  .van-icon{
    font-size: 25px;
  }

  .grid-item1-p{
      color: #FBCA7E ;
  }
  .grid-item2-p{color:#ED705A}
  .grid-item3-p{color: #88C673 ;}
  h2>span{
    font-size: 15px;
    color: black;
  }
  .grid-item1-p1{
        font-size: 12px;
  }
  .list-ul {
    margin-top: 10px ;
  }
.list-ul li{
  border-top: 0.5px solid #fff;
  border-bottom: 0.5px solid #fff;
}

.list-ul li:first-child /deep/ .van-nav-bar__left .van-icon-bill-o {
  color: #00A67C;
  font-size: 20px;
}
.list-ul li:nth-child(2) /deep/ i:first-child {
  color: #A6CEBD;
  font-size: 20px;
}
.list-ul li:nth-child(3) /deep/ i:first-child {
  color: #F8D3AE;
  font-size: 20px;
}
.list-ul li:nth-child(4) /deep/ i:first-child {
  color: #68AE8A;
  font-size: 20px;
}
.list-ul>li /deep/ .van-nav-bar__right i:last-child{
      color: #ccc;
      font-size: 20px;
}
 </style>
