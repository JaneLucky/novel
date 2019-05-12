<template>
    <div class="container">
        <div class="news_group clearFixed">
            <div class="news_img"><img src="http://127.0.0.1:3000/book-news.png" alt=""></div>
            <div>
                <ul class="news_li" :style="carousel_style">
                    <li>
                        <h2>每天清晨被闹钟叫醒</h2>
                        <p>上班一族的苦恼</p>
                    </li>
                    <li>
                        <h2>好书就在爱小说书城</h2>
                        <p>限量VIP会员专区开通送半年</p>
                    </li>
                    <li>
                        <h2>新书上架小伙伴都在阅读</h2>
                        <p>新书上架免费看限时优惠</p>
                    </li>
                    <li>
                        <h2>金庸武侠限时特惠</h2>
                        <p>纪念版上线免费领取阅读</p>
                    </li>
                    <li>
                        <h2>看小说就上爱读在线</h2>
                        <p>数万本小说任你选</p>
                    </li>
                    <li>
                        <h2>每天清晨被闹钟叫醒</h2>
                        <p>上班一族的苦恼</p>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Carousel_txt",
    data(){
        return {
            i:1,
            interval:null,
            carousel_style:{
                top:"-3rem",
                transition:"1s"

            }
        }
    },
    methods:{
        carouselAuto(liSize){
            this.interval=setInterval(()=>{
                if(this.i<(liSize-1)){
                    this.i++;
                    this.carousel_style.top=this.i*(-3)+"rem";
                }else{
                    this.i++;
                    this.carousel_style.top=this.i*(-3)+"rem";
                    setTimeout(()=>{
                        this.i=0;
                        this.carousel_style.top="0rem";
                        this.carousel_style.transition="0s";
                    },1000)
                }
                this.carousel_style.transition="1s";

            },2000)
        }
    },
    created(){
        this.carouselAuto(5);
    }
}
</script>
<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .container{
        margin-top: -1rem;
    }
    ul>li{
        list-style: none;
    }
    .news_group{
        padding: 1.4rem 1rem;
    }
    .news_group>div{
        float: left;
        height: 3rem;
    }
    .news_group>div:first-child{
        overflow: hidden;
    }
    .news_group>div:last-child{
        min-width: 65%;
        overflow: hidden;
        position: relative;
    }
    .news_group>div>img{
        display: block;
        height: 100%;
    }
    .news_group>div:last-child>ul{
        width: 100%;
        height: 15rem;
        position: absolute;
    }
    .news_group>div:last-child>ul>li{
        width: 100%;
        height: 3rem;
        padding: 0.7rem;
    }
    .news_li li{
        padding: 0 0.5rem;
    }
    .news_li li h2,.news_li li p{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
    word-break: break-all;
    text-align: left;
    }
    .news_li li h2{
        font-size: 1rem;
        font-weight: normal;
        color: #333333;
    }
    .news_li li p{
        font-size: 0.8rem;
        color: #999;
    }
    .clearFixed::after{
        content: "";
        display: block;
        clear: both;
        }
</style>

