<template>
    <div>
<!--      评分部分-->
        <div class="appraise">
          <div class="appleft">
            <h3>4.5</h3>
            <p><b>综合评分</b></p>
            <p>高于周边商家99%</p>
          </div >
          <div class="appright">
              <div><van-rate v-model="merchant.goodsScore" allow-half size="13px" readonly />  <span style="font-size: 13px"> <b>服务评分</b> <span style="color: #F2A239;">{{merchant.goodsScore}}</span>   </span></div>
              <div><van-rate v-model="merchant.serviceScore" allow-half size="13px" readonly />  <span style="font-size: 13px"> <b>商品评分</b> <span style="color: #F2A239;">{{merchant.serviceScore}}</span> </span></div>
              <p style="text-align: left;font-size: 13px;margin: 0"> <b>送达时间</b> {{merchant.deliveryTime}}分钟 </p>
          </div>
        </div>
<!--        分割线-->
        <div style="background:#F4F5F7;padding: 10px 0  "></div>
<!--      评论内容-->
        <div class="comm">
          <van-tabs type="card" background="#DCDDDE" title-active-color="#fff" title-inactive-color="#000" color="#4AA478">
            <van-tab title="全部">内容 1</van-tab>
            <van-tab title="满意">内容 2</van-tab>
            <van-tab title="不满意">内容 3</van-tab>
          </van-tabs>
        </div>
    </div>
</template>

<script>
  import {mapState} from "vuex"
    export default {
        name: "Appraise",
        props:['id'],
        data(){
            return{
              card:0,
              allpamm:""  //全部评论
            }
        },
      components:{

      },
      computed:{
          ...mapState(['merchant']),
      },
      created() {
          var app = this
        this.$http.get("/biz//queryCommentByShopId?shopId="+this.id).then(function (res) {
          console.log(res.data)
          app.allpamm = res.data
        })
      },
    }
</script>

<style scoped>
  .appraise{
    overflow: hidden;
    padding: 15px 0;
  }
  .appraise>.appleft{
    float: left;
    width: 40%;
    border-right: 2px solid lightgray;
  }
  .appraise>.appright{
    width: 58%;
    float: right;
  }
  .appleft> * {
      padding: 0;
      margin: 0;
  }
  .appleft>h3{
    font-size: 20px;
    color: #F2A239;
  }
  .appleft>p>b{
    font-size: 13px;
  }
  .appleft>p:last-child{
    font-size: 12px;
    color: #DBD1CE;
  }
/*评论的样式*/
  .comm /deep/ .van-tabs__nav--card{
    border: 0;
  }
  .comm /deep/ .van-tabs__nav--card .van-tab{
    border: 0;
  }

</style>
