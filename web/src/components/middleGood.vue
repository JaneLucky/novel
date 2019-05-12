<template>
    <div class="container">
        <div class="clearFixed title">
            <div class="line">
            </div>
            <div>{{floorTitle}}</div>
            <div @click="changeOnePage">换一换 <img src="http://127.0.0.1:3000/fresh.png" alt=""></div>
        </div>
        <ul class="list">
             <li class="item clearFixed" v-for="(item, index) in quality.slice(0,1)" :key="index">
                 <router-link :to="`/detailList?bid=${item.bid}`">
                    <div class="left">
                        <img :src="item.pic" alt="">
                    </div>
                    <div class="right">
                        <h3>{{item.title}}</h3>
                        <p>{{item.description}}</p>
                        <div class="allNum">{{item.size}}0000</div>
                    </div>
                 </router-link>
            </li>
        </ul>
        <smallGood :recommend="quality.slice(1,5)"></smallGood>
    </div>
</template>
<script>
import smallGood from "../components/smallGood"
import { Toast } from 'mint-ui';
export default {
    name:"middleGood",
    props:["floorTitle","quality","pno","allno"],
    data(){
        return {}
    },
    methods:{
        changeOnePage(){
            if(this.pno<this.allno){
                this.$parent.loadQuality();   
            }else{
                Toast("没有更多商品了...");
                return;
            }
        }
    },
    components:{
        smallGood
    }
}
</script>
<style scoped>
ul>li{
    margin: 0 auto;
    padding: 0;
    list-style: none;
}
.container{
    width: 100%;
}
.container .list{
    width: 100%;
    padding: 0 0.3rem 0;
    margin: 0.2rem 0 0.5rem 0;
}
.container .list>li{
    padding: 0 0.3rem 0 0.3rem;
}
.container .list>li div{
    float: left;
}
.container .list>li div img{
    width: 100%;
    display: block;
}
.container .list>li div:first-child{
    width: 30%;
}
.container .list>li div:last-child{
    width: 70%;
    padding-left: 0.8rem;
}
.container .item div>h3{
    color:#333;
    font-size: 1rem;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
    word-break: break-all;
    text-align: left;
    font-weight: bold;
}
.container .item div>p{
    font-size: 0.9rem;
    line-height: 1.2rem;
    color:#888;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin-top: .16rem;
    max-height: 100%;
    font-weight: bold;
    padding-top: 0.5rem;
}
.allNum{
    font-size: 1.2rem;
    font-weight: bold;
    color: #4cb3b2;
}








.title{
    height: 2rem;
    margin-bottom: 0.3rem;
}
.title>div{
    float: left;
    line-height: 2rem;
    font-size: 1em;
    font-weight: bold;
    color: #666
}
.title>div:last-child{
    float: right;
    margin-right: 0.8rem;
    font-size: 0.9em;
}
.title>div:last-child>img{
    height: 1rem;
    vertical-align: middle
}
.title>.line{
    width: 0.3rem;
    height:1.5rem;
    background: #4cb3b2;
    margin: 0.25rem 0.25rem 0.25rem 0.5rem;
}
.clearFixed::after{
    content: "";
    display: block;
    clear: both;
    }
</style>
