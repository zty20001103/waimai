<template>
    <div>
<!--      头部-->
      <div class="head">
        <van-nav-bar
          left-arrow
          z-index="1"
          @click-left="onClickLeft"
        >
          <template #title>
            <img class="barimg" :src="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+offd.photo" alt="" width="88px" height="88px">
          </template>

        </van-nav-bar>
        </div>
<!--      商品名称-->
      <div class="offdname">
        <h3> <span>品牌</span> {{offd. name}} </h3>
        <p> <span>评分{{offd.goodsScore}}</span> <span>月售{{offd.sales}}单</span> <span>联想教育</span> <span>约{{offd.deliveryTime}}分钟</span> <span>相距{{offd.distance}}米</span> </p>
      </div>
<!--      优惠券-->
      <div>
        <van-row  style="text-align:center">
         <span @click="show = true" style="border: 1px solid #ebedf0;">
        <span><van-tag class="van_tag" color="#FFD700" text-color="#FFF" >首单</van-tag></span>
        <span style="color: #808080; font-size: 12px;">新用户下单立减17元(不同其他    8个优惠   </span><van-icon name="arrow-down" /></span>
          <van-action-sheet v-model="show" title="优惠活动" :closeable="false" cancel-text="取消">
            <div class="content">
              <van-row type="flex" justify="center">
                <van-list>
                  <van-cell v-for="item in coupons" :key="item.id">
                    <van-tag type="danger">{{item.tag}}</van-tag>
                    <span>{{item.contents}}</span>
                  </van-cell>
                </van-list>
              </van-row>

            </div>
          </van-action-sheet>
        </van-row>

      </div>

<!--      商品 评论 商家 的tab切换   -->
      <van-tabs v-model="active">
        <van-tab title="点餐">
          <div class="sidebar">
            <div class="sidebar-left">
              <van-sidebar v-model="activeKey" >
                <van-sidebar-item v-for="item in sidebar" :key="item.id" :title="item.name"  @click.native="changeFood(item.id,item.name)" ></van-sidebar-item>
              </van-sidebar>

            </div>
            <div class="sidebar-rigth" >
              <div style="background: #FAFAFA;text-align: left;margin-bottom: 20px;padding: 10px 0"> {{foodName}}</div>
              <div class="qqqq" v-for="(item,i) in classcomm "  :key="item.id">
                <van-card
                  price="9.00"
                  :desc="item.info"
                  :title="item.name"
                  :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+item.photo"
                >
                  <template #tags>
                    <p> 月销售两86分 好评率100% </p>
                  </template>
                  <template #num>
                    <van-icon @click="iconAdd(item.id)" name="add" color="#51B14D" size="20px"/>
                  </template>
                </van-card>
              </div>
            </div>
            <!--          结算的购物车-->
            <div class="shopping">
              <van-submit-bar  :price="gettersAmount*900" :safe-area-inset-bottom="true"  text-align="left" button-text="提交订单" style="background-color: #000000" >
                <template #default>
                  <van-badge is-link :content="buyfood.length" v-if="buyfood.length!==0" />
<!--                  下方弹出框   -->
                  <van-cell  @click="showPopup"  class="shopping-img2" style="width: 45px" >
                      <van-icon name="cart"   size="27px" color="#fff"  />
                  </van-cell>
<!--                  弹出的内容-->
                  <van-popup  v-model="show" position="bottom"   >
                      <div>
                        <ul class="bottom-poput">
                          <li> <p>购物车</p>  <p>清空</p> </li>
                          <li v-for="(item,i) in buyfood">
                            <p>{{item.list[0].foodName}}</p>
                            <p><van-stepper :min="0" @minus="minus(item.id,item.list[0].shopId)" @plus="plus(item.id)" v-model="item.list[0].shopId" theme="round" button-size="22" disable-input /></p>
                            <p>￥{{item.list[0].shopId*9 }}</p>
                          </li>
                        </ul>

                      </div>
                  </van-popup>

                </template>

                <template #button >
                  <van-button type="primary" size="large" style="border-radius:0;width: 31%">结算</van-button>
                </template>

              </van-submit-bar>
            </div>

          </div>
        </van-tab>
        <van-tab title="评价" > <Appraise :id="id"></Appraise> </van-tab>
        <van-tab title="商家" > <Merchant :merchant="id"></Merchant>  </van-tab>
      </van-tabs>
<!--    商店里的详情商品  -->


    </div>
</template>

<script>
  import Merchant from "./Merchant";
  import Appraise from "./Appraise";
  import {mapState,mapMutations,mapGetters} from "vuex"
    export default {
        name: "Detailpage",
        props:['id'],
        data(){
            return{
              offd:"",  //商家信息
              coupons:"",   //优惠券
              activeKey:0,
              sidebar:"",//右侧导航栏信息
              classcomm:"", //指定分类商品
              active:'1',
              buyfood:"",//用户购买的商品的详情
              show: false, //底部弹出框
              foodName:"",  //分类商品的名称
            }
        },
      components:{
          Merchant,
          Appraise
      },
      computed:{
        ...mapState(['name']),//将state的数据引入
        ...mapGetters(['gettersAmount'])

      },
      methods:{
          ...mapMutations(['mutationsMerchant','mutationsShopping','mutationsPush','mutationsplus','mutationsMinus2','mutationsMinus']),
        //商品减一
        minus(id,quan){
            var app = this
          if (quan>1){
            console.log("大于1")
            this.mutationsMinus2(id)
          }else {   //小于1则删除该订单
              this.$http.post("/biz/deleteOrderByOid?orderId="+id).then(function (res) {
                console.log(res.data)
                if (res.data == 1){
                      app.mutationsMinus(id)
                }
              })
          }
        },
        //  购买的商品加一
        plus(id){
            for (var i=0;i<this.buyfood.length;i++){
              if (id == this.buyfood[i].id){
                this.mutationsplus(this.buyfood[i])
              }
            };

        },
        showPopup() {   //底部弹出框是否弹出
          this.show = true;
        },
        //  添加订单
        iconAdd(foodId) {
          var app = this
          console.log(this.name);
          console.log("name="+this.name.id);
          this.$http.post("/biz/insertOrder",{
            "userId":this.name.id,
	          "shopId":this.id,
            "list": [ { "foodId": foodId, "buyCount":1  }]
          }).then(function (res) {
            if( res.data==1 ){
                console.log('成功');
                var maxlength = parseInt(app.buyfood[app.buyfood.length-1].boughtId)  //保存订单的id
                maxlength++
              var maxlist = parseInt(app.buyfood[app.buyfood.length-1].list[0].id)  //保存订单里的商品的id
              maxlist++

              for (var i=0;i<app.classcomm.length;i++){   //拿到指定的商品详情
                if (foodId == app.classcomm[i].id ){
                  var classcomms = app.classcomm[i]
                  console.log(classcomms)
                }
              };

                var pushoffd= {
                    "id": maxlength,
                    "userId": app.name.id,
                    "shopId": app.offd.bigcategoryId,
                    "shopName": app.offd.name,
                    "roderTime": "2021-06-10 19:57:55.0",
                    "boughtId": "7328",
                    "list": [
                      {
                        "id": maxlist,
                        "foodId": foodId ,
                        "foodName": classcomms.name,
                        "foodPhoto": classcomms.photo,
                        "foodInfo": classcomms.info,
                        "buyCount": 1,
                        "shopId": null,
                        "shopName": null
                      }
                    ]
                  }
              app.mutationsPush(pushoffd)
            }
          })

        },
          //切换分类后获取指定分类的商品
        changeFood(id,name){
          var app = this
          this.foodName=name
          this.$http.get("biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId="+this.id+"&foodcategoryId="+id).then(function (res) {
            app.classcomm= res.data
          })
        },
        onClickLeft(){   //返回上一级路由
          this.$router.go(-1)
        },
      },


      beforeRouteEnter(to,from,next){
        next(function (vm) {
          //商家信息
          vm.$http.get("/biz/queryInfoByShopId?shopId="+vm.id).then(function (res) {
            vm.offd = res.data
            vm.mutationsMerchant(res.data)
          });

          vm.$http.get("/biz/queryFoodCategory?id="+vm.id).then(function (res) {   //右侧导航分类信息
            vm.sidebar = res.data
            vm.foodName = res.data[0].name
              //初始获取默认加载的第一个分类商品
              vm.$http.get("biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId="+vm.id+"&foodcategoryId="+vm.sidebar[0].id).then(function (res) {
                vm.classcomm= res.data
              })
          });

          vm.$http.get("/biz//querySpecialOfferByShopId?shopId="+vm.id).then(function (res) {   //优惠券
            vm.coupons=res.data
          });

          vm.$http.get("/biz/queryOrdersByUserId?userId="+vm.name.id).then(function(res) {   //获取用户购买商品的信息
              vm.buyfood=res.data
              vm.mutationsShopping(res.data)
          })

        })
      },
      beforeRouteUpdate(to,from,next){
          var app = this
        this.$http.get("/biz/queryInfoByShopId?shopId="+this.id).then(function (res) {
          app.offd = res.data
          app.mutationsMerchant(res.data)
        })
        this.$http.get("/biz//querySpecialOfferByShopId?shopId="+this.id).then(function (res) {
           app.coupons=res.data
        })
        this.$http.get("/biz/queryFoodCategory?id="+this.id).then(function (res) {   //右侧导航分类信息
          app.sidebar = res.data
          app.foodName =res.data[0].name
          //初始获取默认加载的第一个分类商品
          this.$http.get("biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId="+this.id+"&foodcategoryId="+this.sidebar[0].id).then(function (res) {
            console.log(res.data)
            app.classcomm= res.data
          })
        })

        this.$http.get("/biz/queryOrdersByUserId?userId="+this.name.id).then(function(res) {   //获取用户购买商品的数量
              app.buyfood=res.data
              app.mutationsShopping(res.data)
          })
        next()
      },
    }
</script>

<style scoped>
.head /deep/ .van-nav-bar__content{
background:#00A67C;
  border: 0;
}
  .head /deep/ *{
    color: #fff;
    font-size: 20px;
  }
  .barimg{
    margin-top: 70px;
    position: relative;
    z-index:5;
  }
  .offdname{
    margin-top: 60px;
  }
  .offdname>h3>span{
    font-size: 14px;
    padding: 2px;
    background: #F8D959;
  }
  .offdname>p{
    font-size: 11px;
  }

  .sidebar{
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 50px;
    display: -webkit-box;
  }
  .sidebar>.sidebar-left{
    float: left;
    width: 20%;
  }

  .sidebar>.sidebar-left>.van-sidebar{
    width: 100%;
  }
.sidebar>.sidebar-rigth{
  float: right;
  width: 80%;
}
.sidebar>.sidebar-rigth>.qqqq{
  margin-top: 10px;
}
  .sidebar>.sidebar-rigth>.qqqq .van-card__content>*{
    text-align: left;
  }
  .sidebar-left .van-sidebar{
    position: relative;
    z-index: 2;
  }
  .shopping .van-submit-bar>van-submit-bar__bar{
    z-index: 4000;
  }
  .shopping .shopping-img2{
    background: #07C160;
    padding: 7px;
    margin-left: 40px;
    margin-bottom: 22px;
    border-radius: 50%;
    z-index: 400;
  }
  .shopping .van-submit-bar .van-submit-bar__bar{
    padding: 0;
  }
.shopping .van-submit-bar *{
  color: #ffffff;
}
.shopping .van-badge{
  position: absolute;
  top: -12px;
  left: 70px;
  border: none;
  z-index: 401;
}
.shopping .shopping-img2>i:last-child{
  display: none
}
.shopping .shopping-img2>div{
    margin-top: 5px;
  margin-left: 2px;
}
 .shopping .bottom-poput>li>p{
    color: #000000;
   margin: 15px 10px;
  }
.shopping .bottom-poput>li{
  overflow: hidden;
  padding: 0 20px;
  border-bottom:1px solid #F4F5F7
}
.shopping .bottom-poput>li:first-child{
  background: #F4F5F7;
}
.shopping .bottom-poput>li>p:first-child{
  float:left;
}
.shopping .bottom-poput>li>p:last-child{
  float: right;
}
.shopping .bottom-poput>li>p:nth-child(2){
  float: right;
  margin-right: 10px;
}
</style>
