<template>
    <div>
        <div class="header">
            <van-nav-bar title="搜索"   style="background: #00A67C; "/>
        </div>
<!--      搜索栏-->
      <!--              @search="onSearch"-->
        <div>
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @input="SearchInput"
          >
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </div>

      <!--      若没有搜索到数据则显示此内容-->
      <div v-if="this.foodCategory=='' " >
        <van-empty image="search" description="抱歉。没有找到该商品" />
      </div>

<!--      商品列表-->
      <div class="list" v-else >
        <van-cell @click="clickCard(item.id)" v-for="item in foodCategory" :key="item.id" >
          <van-card
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
      </div >

    <foo></foo>
    </div>
</template>

<script>
  import foo from "./foo";
export default {
    data(){
        return{
          value:"",
          foodCategory:"" //初始获得的商品详情
        }
    },
    components:{
        "foo":foo
    },
  methods:{
    //  跳转到指定商家详情
    clickCard(id) {
      this.$router.push("/detailpage/" + id)
    },

    onSearch(){   //单机搜索，模糊查询商家信息
      var app = this
      this.$http.get("/biz/queryAllShopsInfoByName?name="+this.value).then(function (res) {
        console.log(res.data)
        app.foodCategory = res.data
      })
    },
    SearchInput(text){   //文本框发生变化时  模糊查询商家信息
      var app = this
        this.$http.get("/biz/queryAllShopsInfoByName?name="+this.value).then(function (res) {
          // console.log(res.data)
          app.foodCategory = res.data
          if (app.foodCategory==""){
            console.log(app.foodCategory)
            console.log("kong1")
          }
        })
    }
  },

  //守卫函数，起始加载全部商家信息
  beforeRouteEnter(to,from,next){
      next(function (vm) {
        vm.$http.get("/biz/queryAllShopsInfo").then(function (res) {
          vm.foodCategory = res.data
        })
      })
  },
  beforeRouteUpdate(to,from,next){
    var app = this;
    this.$http.post("/biz/queryBigCategory").then(function (res) {  //拿到商品分类的信息
      app.foodCategory = res.data
    });
    next();

  },
}
</script>

<style scoped>
  .list{
    margin-bottom: 50px;
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
