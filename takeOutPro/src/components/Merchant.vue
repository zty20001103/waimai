<template>
    <div class="van-hairline--top">
        <van-row type="flex" >
        <span style="margin: 0 10px;" >
            <h3>配送信息</h3>
        </span>
        </van-row>
        <van-row type="flex" >
        <span style="margin: 0 10px;" ><van-tag size="medium" color="#7232dd">联想外卖</van-tag></span>
        <span style="color: #808080; font-size: 14px;">由商家配送提供配送,约30分钟送达,距离1500m</span>
        </van-row>
        <van-row type="flex" >
        <span style="margin: 10px 10px;color: #808080; font-size: 14px;" >
            配送费 ￥5
        </span>
        </van-row>
        <div style="background:#ebedf0;padding:8px;"></div>
        <van-row type="flex" >
        <span style="margin: 0 10px;" >
            <h3>活动与服务</h3>
        </span>
        </van-row>
        <van-row type="flex" style="margin-top: -10px">
            <span style="margin: 0 -8px;">
            <van-list>
            <van-cell  v-for="item in merdata" :key="item.id">
            <van-tag size="medium" color="#7232dd">{{item.tag}}</van-tag>
            <span>{{item.contents}}</span>
            </van-cell>
            </van-list>
            </span>
        </van-row>
        <div style="background:#ebedf0;padding:8px;"></div>
         <van-row type="flex" >
        <span style="margin: 0 10px;" >
            <h3>商家实景</h3>
        </span>
        </van-row>
        <van-row style="margin-top:-10px">
                <span van-col="8"><van-image width="8rem" height="5rem" fit="contain" src="https://img01.yzcdn.cn/vant/cat.jpeg"/></span>
                <span van-col="8"><van-image width="8rem" height="5rem" fit="contain" src="https://img01.yzcdn.cn/vant/cat.jpeg"/></span>
                <span van-col="8"><van-image width="8rem" height="5rem" fit="contain" src="https://img01.yzcdn.cn/vant/cat.jpeg"/></span>
            <div class="van-hairline--top" style="margin:5px 0"></div>
        </van-row>   
          
    </div>
</template>
<script>
export default {
    name:"merchant",
    props:['merchant'],
    data(){
        return{
            merdata:""
        }
    },
    created(){
        var app = this
        this.$http.get("/biz//querySpecialOfferByShopId?shopId="+this.merchant).then(function(res) {
            console.log(res)
             if(res.data){
                 app.merdata = res.data
             }       
    })
    }
}
</script>
<style>
.van-cell::after{
    border-bottom: 0px solid #ebedf0
}
</style>