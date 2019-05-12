<template>
    <div class="container"> 
        <Header></Header>
        <Carousel1></Carousel1>
        <div class="main">
            <div class="clearFixed title">
                <div class="line">
                </div>
                <div>免费小说-【力推】</div>
            </div>
            <div class="item clearFlex" v-for="(item, index) in overList.slice(0,1)" :key="index">
                <router-link :to="`/detailList?bid=${item.bid}`"> 
                    <div class="img">
                        <img :src="item.pic" alt="">
                    </div>
                    <div class="txt">
                        <h3>{{item.title}}</h3>
                        <p>{{item.description}}</p>
                        <div>
                            <span>{{item.author}}</span>
                            <span>{{item.size}}万</span>
                            <span style="display:none;"></span>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="clearFixed title">
                <div class="line">
                </div>
                <div>免费小说-【经典】</div>
            </div>
            <ul class="middleList">
                <li class="item" v-for="(item, index) in overList.slice(1,5)" :key="index">
                    <router-link :to="`/detailList?bid=${item.bid}`"> 
                        <div>
                            <img :src="item.pic" alt="">
                            <h3>{{item.title}}</h3>
                            <p>{{item.description}}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="clearFixed title">
                <div class="line">
                </div>
                <div>免费小说-【所有】</div>
            </div>
            <ul class="middleList">
                <li class="item" v-for="(item, index) in overList.slice(5,)" :key="index">
                    <router-link :to="`/detailList?bid=${item.bid}`"> 
                        <div>
                            <img :src="item.pic" alt="">
                            <h3>{{item.title}}</h3>
                            <p>{{item.description}}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <Footer :barNo="barNo"></Footer>
    </div>
</template>
<script>
import Carousel1 from "../components/Carousel1"
import Footer from "../components/Footer"
import Header from "../components/Header"
export default {
    name:"FreeBook",
    data(){
        return {
            barNo:2,
            overList:[],

        }
    },
    methods:{
        loadList(){
            this.axios.get("http://127.0.0.1:3000/product/overList").then((result)=>{
                // console.log(result.data.msg);
                this.overList=result.data.msg;
            });
        }
    },
    components:{
        Footer,
        Carousel1,
        Header
    },
    created(){
        this.loadList();
    }
}
</script>
<style scoped>
     
.title{
    height: 2rem;
    margin-top: 0.5rem;
}
.title>div{
    float: left;
    line-height: 2rem;
    font-size: 1em;
    color: #666;
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
    padding: 0;
    margin: 0;
}
.main{
    padding: 0.7rem 0;
}
.main>.item{
    padding: 0.3rem 1rem;
}
.main>.item div{
    float: left;
}
.main>.item .img{
    width: 25%;
}
.main>.item .txt{
    width: 75%;
    padding-left: 0.8rem;
}
.main>.item .img img{
    width: 100%;
}
.line{
    width: 100%;
    height: 0.5rem;
    background: rgba(128,128,128, 0.1);
}
.main>.item .txt>p{
    font-size: 0.9rem;
    color:#888;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.main>.item .txt>h3{
    font-weight: normal;
    font-size: 1.2rem;
    color:#333;
    margin-bottom: 0.5rem;
}
.main>.item .txt>div>span{
    float:right;
    border: 1px solid #eee;
    font-size: 0.8rem;
    color:#888;
}
.main>.item .txt>div>span+span{
    margin-left: 0.5rem;
    padding: 0.1rem 0.3rem;
}
.main>.item .txt>div>span:first-child{
    float: left;
    font-size: 0.9rem;
    color:#888;
    border: none;
}
.main>.item .txt>div>span:last-child{
    color: #4cb3b2;
}
.clearFlex::after{
content: "";
display: block;
clear: both;
}




.middleList{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin: 0 auto;
    padding: 0 0.3rem 0;

}
.middleList .item{
    width: 25%;
    box-sizing: border-box;
}
.middleList .item div{
    margin: 0.3rem;
    text-align: center;
    overflow: hidden;
}
.middleList .item img{
    width: 100%;
    display: block;
    margin: 0 auto 0.5rem;
    
}
.middleList .item div>p{
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
.middleList .item div>h3{
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
</style>
