<template>
    <div class="container">
        <mt-header fixed title="书城" style="background:#fff;color:#333;font-size:1rem;">
            <router-link to="/" slot="left">
                <mt-button>
                    <img src="http://127.0.0.1:3000/back.png" alt="" style="height:50%; vertical-align: middle;">
                </mt-button>
            </router-link>
        </mt-header>
        <Carousel1></Carousel1>
        <Grid></Grid>
        <CarouselTxt></CarouselTxt>
        <!-- <input type="search" name="keywords" id="keywords" @focus="getFocus" @blur="getBlur" :class="getBck"> -->

        <Recommend :recommend="recommend" :floorTitle="floor1Title" :pno="pnoRe" :allno="allnoRe" :isShowTop="isShowTop"></Recommend>
        <Recommend :recommend="newBooks" :floorTitle="floor2Title" :pno="pnoReNew" :allno="allnoReNew" :isShowTop="isShowTop"></Recommend>
        <div>
            <Recommend :recommend="femaleBooks.slice(0,4)" :floorTitle="floor3Title" :pno="pnoReFemale" :allno="allnoReFemale" :isShowTop="isShowTop"></Recommend>
            <smallGood :recommend="femaleBooks.slice(4,8)"></smallGood>
        </div>
        <div>
            <Recommend :recommend="maleBooks.slice(0,4)" :floorTitle="floor4Title" :pno="pnoReMale" :allno="allnoReMale" :isShowTop="isShowTop"></Recommend>
            <smallGood :recommend="maleBooks.slice(4,8)"></smallGood>
        </div>
        <Footer :barNo="barNo"></Footer>
    
    </div>
</template>
<script src="../lib/mui/js/mui.js">
</script> 
<script>
import { Toast } from 'mint-ui';
import Carousel1 from "../components/Carousel1"
import CarouselTxt from "../components/Carousel_txt"
import Recommend from "../components/Recommend"
import smallGood from "../components/smallGood"
import Grid from "../components/Grid"
import Footer from "../components/Footer"
export default {
    data(){
        return {
            barNo:3,
            isShowTop:true,
            getBck:"",
            pnoRe:0, //用于标记精品推荐的分页中的第几页
            allnoRe:0,//用于标记精品推荐的总页数
            recommend:[],  //推荐的小说
            floor1Title:"精品推荐",
            pnoReNew:0, //用于标记新小说的分页中的第几页
            allnoReNew:0,//用于标记新小说的总页数
            newBooks:[], //新小说
            floor2Title:"新书专区",
            pnoReFemale:0, //用于女生美文的分页中的第几页
            allnoReFemale:0,//用于标记女生美文的总页数
            femaleBooks:[], //女生美文
            floor3Title:"女生美文",
            pnoReMale:0, //用于男生热文的分页中的第几页
            allnoReMale:0,//用于标记男生热文的总页数
            maleBooks:[], //男生热文
            floor4Title:"男生热文",
            dt:new Date()
        }
    },
    methods:{
        // getFocus(){
        //     this.getBck="colorGray"
        // },
        // getBlur(){
        //     this.getBck=""
        // },
        getMore(){
            if(this.output.pno < this.output.pCount){
                this.load1();
            }else{
                Toast("没有更多商品了...");
                return;
            }
        },
        //用于请求精品推荐的数据
        loadRecommend(){
            this.axios.get("http://127.0.0.1:3000/product/recommend",{
                 params:{
                    pnoRe:this.pnoRe
                }
            }).then((result)=>{
                this.recommend=result.data.msg;
                this.pnoRe=result.data.pnoRe;
                this.allnoRe=result.data.allnoRe;
            })
        },
        changeOnePage(){
            this.loadRecommend();    
        },
        loadNew(){
            this.axios.get("http://127.0.0.1:3000/product/recommendNew",{
                 params:{
                    pnoReNew:this.pnoReNew
                }
            }).then((result)=>{
                this.newBooks=result.data.msg;
                this.pnoReNew=result.data.pnoReNew;
                this.allnoReNew=result.data.allnoReNew;
            })

        },
        loadFemale(){
            this.axios.get("http://127.0.0.1:3000/product/recommendFemale",{
                 params:{
                    pnoReFemale:this.pnoReFemale
                }
            }).then((result)=>{
                this.femaleBooks=result.data.msg;
                this.pnoReFemale=result.data.pnoReFemale;
                this.allnoReFemale=result.data.allnoReFemale;
            })

        },
        loadMale(){
            this.axios.get("http://127.0.0.1:3000/product/recommendMale",{
                 params:{
                    pnoReMale:this.pnoReMale
                }
            }).then((result)=>{
                this.maleBooks=result.data.msg;
                this.pnoReMale=result.data.pnoReMale;
                this.allnoReMale=result.data.allnoReMale;
            })

        },

    },
    components:{
        Carousel1,
        CarouselTxt,
        Recommend,
        smallGood,
        Footer,
        Grid
    },
    created(){
        this.loadRecommend();
        this.loadNew();
        this.loadFemale();
        this.loadMale();
    }
}
</script>
<style scoped>
    image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
    }
    .colorGray{
        background-color: rgba(163, 160, 160,0.5) !important;
    }
    .container{
        position: relative;
        /* background: gray */
        width: 100%;
    }
    #keywords{
        width: 90%;
        display: block;
        position: absolute;
        top:0.3rem;
        left: 50%;
        transform: translateX(-50%);
        background: url(http://127.0.0.1:3000/search.png) left no-repeat rgba(163, 160, 160,0.3);
        background-size: 1.3rem 1.3rem;
        background-position-x: 0.4rem;
        text-indent: 1rem
        
    }
    .container>>> .mint-swipe-items-wrap::after{
        content: "";
        display: block;
        clear: both;
    }
        .swipeItem a{
            display: block;
        }
        .swipeItem{
            height: 10rem;
        }
        .swipeItem img{
            display: block;
            width: 100%;
        }
        .swipeItem a{
            display: block;
        }
</style>

