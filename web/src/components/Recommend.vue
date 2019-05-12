<template>
    <div>
        <div class="clearFixed title">
            <div class="line">
            </div>
            <div>{{floorTitle}}</div>
            <div @click="changeOnePage" v-show="isShowTop">换一换 <img src="http://127.0.0.1:3000/fresh.png" alt=""></div>
        </div>
        <ul class="container">
            <li class="item" v-for="item of recommend" :key="item.id">
                <router-link :to="`/detailList?bid=${item.bid}`">
                    <div>
                        <img :src="item.pic" alt="">
                        <h3>{{item.title}}</h3>
                        <p>{{item.author}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
        <mt-button v-show="isShowTop!=true" type="primary" size="large" style="width:95%;margin:1rem auto;background:#4cb3b2;" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name:"Recommend",
    props:["recommend","floorTitle","pno","allno","isShowTop"],
    data(){
        return {

        }
    },
    methods:{
        changeOnePage(){
            if(this.floorTitle=="精品推荐"){
                if(this.pno<this.allno){
                    this.$parent.loadRecommend();   
                }else{
                    Toast("没有更多商品了...");
                    return;
                }
            }else if(this.floorTitle=="新书专区"){
                if(this.pno<this.allno){
                    this.$parent.loadNew();
                }else{
                    Toast("没有更多商品了...");
                    return;
                }
            }else if(this.floorTitle=="女生美文"){
                if(this.pno<this.allno){
                    this.$parent.loadFemale();
                }else{
                    Toast("没有更多商品了...");
                    return;
                }
            }else if(this.floorTitle=="男生热文"){
                if(this.pno<this.allno){
                    this.$parent.loadMale();
                }else{
                    Toast("没有更多商品了...");
                    return;
                }
            }else if(this.floorTitle=="看过这本书的人还在看"){
                if(this.pno<this.allno){
                    this.$parent.loadRecommend();
                }else{
                    Toast("没有更多商品了...");
                    return;
                }
            }
        },
        getMore(){
            this.$parent.getMore();
        }
    }
}
</script>
<style scoped>
    .title{
        height: 2rem;
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
        width: 0.3em;
        height:1.5rem;
        background: #4cb3b2;
        margin: 0.25rem 0.25rem 0.25rem 0.5rem;
    }
    ul>li{
        list-style: none
    }
    .container{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        margin: 0 auto;
        padding: 0 0.3rem 0;

    }
    .container .item{
        width: 25%;
        box-sizing: border-box;
    }
    .container .item div{
        margin: 0.3rem;
        text-align: center;
        overflow: hidden;
    }
    .container .item img{
        width: 100%;
        display: block;
        margin: 0 auto 0.5rem;
        
    }
    .container .item div>p{
        color:#888;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: break-word;
        word-break: break-all;
        text-align: left;
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
    }
    .clearFixed::after{
        content: "";
        display: block;
        clear: both;
        }

</style>
