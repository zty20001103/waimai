<template>
    <div >
      <!-- 头部导航栏  NavBar 导航栏 -->
        <div class="nav-bar">
          <van-nav-bar title="正在定位..."  fixed style="background: #00A67C; " @click-left="clickLeft">
            <template #left >
              <van-icon name="search" size="18" />
            </template>
            <template #right>
              <p v-if="loingStateus"><span>{{name.name}}</span> | <span @click="logoutNmae">注销</span> </p>
                <p v-else> <a :href="'#/login'">登陆 </a> | <a :href="'#/login'">注册</a> </p>

            </template>
          </van-nav-bar>
        </div>
        <!-- 主要商品分类导航  Grid 宫格 -->
        <div class="sudoku" >
            <van-grid :column-num="4" :border="false" >
              <van-grid-item @click="clickGrid(item.id)" v-for="item in foodCategory" :key="item.id"
                             :icon="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+item.photo" :text="item.name" />
            </van-grid>
        </div>
<!--      附近商家-->
      <div class="merchant">  <span><van-icon name="wap-nav" /> </span> <b>附近商家</b> </div>
<!--      商品列表   -->
      <div class="list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="item in lists" :key="item.id" >
              <van-card
                @click="clickCard(item.id)"
                :num="2"
                :price="item.minPrice+'起送 / 配送费约 ￥'+item.transportationPrice"
                :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+item.photo"
              >
              <!--  -->
                <template #tags>
                  <ul class="list-ul">
                    <li class="list-lu-li1"> <span>品牌</span> <b>{{item.name}} </b></li>
                    <li class="list-lu-li2"> <span>保</span> <span>准</span> <span>票</span> </li>
                  </ul>

                   <div class="list-center">
                     <p> <van-rate size="15px" v-model="item.goodsScore" readonly /> <span>{{item.goodsScore}} </span>
                       <span class="list-sales">月销量{{item.sales}}单</span></p>
                       <p><span class="list-right">联想教育</span></p>
                   </div>
                </template>
              </van-card>
            </van-cell>

          </van-list>
      </div>
<!--底部，导航栏   -->

        <foo></foo>

    </div>
</template>

<script>
  import  { NavBar,Icon,List,Card,Rate  } from "vant"
  import {mapState,mapMutations} from "vuex"
  import foo from "./foo";
    export default {
      name: "Home",
      components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [List.name]: List,
        [Rate.name]: Rate,
        "foo": foo,
      },
      computed:{
        ...mapState(['loingStateus','name'])
      },

      data() {
        return {
          foodCategory: "", //食品分类的数据
          list: "", //店铺商家信息
          lists: [], //需要展示的商家信息
          l: 4,  //没错加载的数据个数
          loading: false,   //是否处于加载状态，加载过程中不触发load事件
          finished: false,  //加载完成后是否不再触发load事件
          active: 0,
        }
      },
      methods: {
        ...mapMutations(['mutationsLoginout']),
        //注销账号，退出登录
        logoutNmae(){
          localStorage.clear()
          this.mutationsLoginout()
        },
        onLoad() {   //下滑到底部触发该函数
          var app = this
          this.$http.get("/biz/queryAllShopsInfo").then(function (res) {
            app.list = res.data

            for (let i = app.lists.length; i < app.l; i++) {
              app.lists.push(app.list[i]);
            }
            // 加载状态结束
            app.l = app.l + 4
            // 加载状态结束
            app.loading = false;
            // 数据全部加载完成
            if (app.lists.length >= app.list.length) {
              app.finished = true;
            }
          })

        },
        clickLeft() {   //转跳搜索页面
          this.$router.push("/search")
          window.localStorage.setItem("subscript", 1);
        },

        clickGrid(res) {
          console.log(res)
          this.$http.get("/biz/queryShopsByBigId?bigcategoryId=" + res).then(function (res) {
            console.log(res.data)
          })
        },

        clickCard(id) {
          this.$router.push("/detailpage/" + id)
        },
      },

        beforeRouteEnter(to, from, next) {
          next(function (vm) {   //拿到商品分类的信息
            vm.$http.post("/biz/queryBigCategory").then(function (res) {
              vm.foodCategory = res.data
            });

          })
        },
        beforeRouteUpdate(to, from, next) {
          var app = this;
          this.$http.post("/biz/queryBigCategory").then(function (res) {  //拿到商品分类的信息
            app.foodCategory = res.data
          });
          next();
        },

    }
</script>

<style scoped>
  .van-grid{
  border-bottom: 1px solid #ebedf0;
}
  .nav-bar{
    margin-top: 60px;
  }
.nav-bar /deep/ * {
  color: #fff;
}

.list /deep/ .van-cell .van-card{
    padding: 5px 5px;
}
.list /deep/ .van-cell{
    padding: 0px;
}
.list /deep/.van-card__header{
  padding: 5px 0;
}
.list /deep/ .van-card__price-integer{
  font-size: 12px;
}
.list-ul>li span{
  background: #F8D959;
  padding: 2px 2px;
  margin: 2px 2px;
}
.list-ul{
  overflow: hidden;
  margin-top: 5px;
  }
.list-ul>li:first-child{
      float: left;
}
.list-ul>li:last-child{
  float: right;
}
.list-ul>li b{
  font-size: 15px;
}

.merchant{
  text-align: left;
  font-size: 15px;
  margin-top: 30px;
  margin-bottom: 10px;
}
.merchant span:first-child{
  padding-top: 5px;
}

.list-sales{
  color: #FFC652;
}
.list-center{
  overflow:hidden;
  line-height: 20px;
}
.list-center p:first-child{
  float: left;
}
.list-center p:last-child{
  float: right;
}

.list-center .list-right{
 color: #FFC652;
 border: 1px solid #FFC652;
 /*font-size: 12px;*/
}

</style>


