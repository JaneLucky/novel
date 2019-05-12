<template>
    <div class="container">
        <Header></Header>
        <div class="top clearFixed">
            <div class="topLeft">
                <img :src="summary.pic" alt="">
            </div>
            <div class="topRight">
                <h3 class="title">{{summary.title}}</h3>
                <p class="author">{{summary.author}}</p>
                <p class="size">{{summary.size}}万字</p>
                <p class="status">{{summary.status}}</p>
            </div>
        </div>
        <div class="description">
            <p>
                {{summary.description}}
            </p>
        </div>
        <div class="allBtn">
            <input type="button" value="继续阅读" @click="readContinue">
            <input type="button" value="离线下载" @click="offlineLoad">
            <input type="button" value="加到书架" @click="addToBookshelf">
        </div>
        <div class="titleList">
            <!-- `/article?bid=${item.bid}` -->
            <router-link :to="`/contentList?bid=${summary.bid}`">
                <div class="item">
                        <div class="img">
                            <img src="http://127.0.0.1:3000/list.PNG" alt="">
                        </div>
                        <div class="txt">
                            <div class="clearFixed">
                                <div>目录</div>
                                <p>&gt;</p>
                            </div>
                        </div>
                </div>
            </router-link>
        </div>
        <Recommend :recommend="recommend" :floorTitle="floor1Title" :pno="pnoRe" :allno="allnoRe" :isShowTop="isShowTop"></Recommend>

    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import Recommend from "../components/Recommend"
import Footer from "../components/Footer"
import Header from "../components/Header"
// import "../common/api.js"
export default {
    name:"DetailList",
    data(){
        return {
            bid:null,
            sid:null,
            scrTop:null,
            isShowTop:true,
            pnoRe:0, //用于标记精品推荐的分页中的第几页
            allnoRe:0,//用于标记精品推荐的总页数
            recommend:[],  //推荐的小说
            floor1Title:"看过这本书的人还在看",
            summary:{},
        }
        
    },
    methods:{
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
        //请求具体图书的详情
        loadBook(){
            this.axios.get("http://127.0.0.1:3000/book/summary",{
                params:{
                    bid:this.bid
                }
            }).then((result)=>{
                // console.log(result.data.msg);
                this.summary=result.data.msg[0];
            });
        }
        ,
        addToBookshelf(){
            // localStorage.clear();
            if(this.checkStorage(this.bid)==false){//以前没有添加到书架,添加到书架
                this.addToStorage(this.bid);
            }else{//以前有
                // console.log(this.$route.path=="/detailList");
                if(this.$route.path=="/detailList"){
                    Toast("购物车中存在该书籍");
                }
            }
            // console.table(localStorage);
            this.sid=this.getLocalStorage(this.bid).sid;
            this.scrTop=this.getLocalStorage(this.bid).scrTop;
            // console.log(this.sid);
        },
        readContinue(){
            this.$router.push(`/article?bid=${this.bid}&sid=${this.sid}&scrTop=${this.scrTop}`);
        },
        offlineLoad(){

        }

    },
    components:{
        Recommend,
        Footer,
        Header
    },
    created(){
//   localStorage.clear();
        this.bid=this.$route.query.bid;
        this.loadRecommend();
        this.loadBook();
        if(!this.checkStorage(this.bid)){
            this.sid=1;
            this.scrTop=0;
        }else{
            this.sid=this.getLocalStorage(this.bid).sid;
            this.scrTop=this.getLocalStorage(this.bid).scrTop;
        }
        // console.log(localStorage);
    },
    watch:{
        '$route'(){
            this.bid=this.$route.query.bid;
            this.loadBook();
        }
    }
}
</script>
<style scoped>
.description{
    padding: 0 0.5rem;
}
.container{
        padding: 0 0.3rem 0;
}
.top>div{
    float: left;
}
.top{
    margin: 0.5rem;
    /* border: 1px solid red; */
}
.top>div img{
    display: block;
    width: 100%;
}
.top>div:first-child{
    width: 35%;
}
.top>div:last-child{
    width: 65%;
    padding: 1rem 0 0 1rem;
}
.top>div h3{
    font-size: 1.5rem;
    color: #666;
    padding-bottom: 0.5rem;
}
.top>div p{
    font-size: 1rem;
    margin: 0;
    padding-top: 0.5rem;
}
.allBtn{
    display: flex;
    justify-content: space-around;
}
.allBtn input{
    width: 30%;
    padding: 0.6rem 0;
    font-size: 1rem;
    outline: none;
}
.allBtn input:first-child,.allBtn input:last-child{
    border: none;
    background: #4cb3b2;
    color: #fff;
    
}
.allBtn input:nth-child(2){
    border: 1px solid #4cb3b2;
    color: #4cb3b2;
}
.titleList{
    margin: 1rem 0;
}
.titleList .item{
    padding:0.6rem 0.5rem;  
    border-bottom: 1px solid #eee;  
    border-top: 1px solid #eee;  
    display: flex;
    justify-content: space-around;
}
.titleList .item>.img{
    width: 8%;
}
.titleList .item>.img img{
    width: 100%;
    display: block;
}
.titleList .item>.txt{
    width: 90%;
}
.titleList .item>.txt>div{
    height: 100%;
    width: 100%;
    position: relative;
    font-weight: bolder;
    color: #555;
}
.titleList .item>.txt>div>div{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.5rem;
    text-align: left;
    color: #666;
}
.titleList .item>.txt>div>p{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    font-size: 1.2rem;
    font-weight: normal;
}

.clearFixed::after{
    content: "";
    display: block;
    clear: both;
    }

</style>
