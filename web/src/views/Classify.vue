<template>
    <div>
        <Header></Header>
        <div class="clearFixed title">
            <div>根据阅读兴趣搜索</div>
             <!-- @click="changeOnePage" v-show="isShowTop" -->
            <div>换一换 <img src="http://127.0.0.1:3000/fresh.png" alt=""></div>
        </div>
        <div class="keyWords">
            <span v-for="(item, index) of classifyList.slice(0,5)" :key="index">{{item.keywords[0]}}</span>
            <!-- <span>情况情况</span><span>情况</span><span>情况</span><span>情况情况</span> -->
        </div>
        <div class="main">
            <div class="clearFixed">
                <div v-for="(item, index) of classifyList" :key="index">
                    
                    <router-link :to="`/category?fid=${item.fid}`">
                        <!-- `/category:${item.fid}` -->
                    <div>
                        <div class="item clearFixed">
                            <div>
                                <p>{{item.fname}}</p>
                            </div>
                            <div class="allImgs">
                                <img :src="item.fpic" alt="">
                            </div>
                        </div>
                        <div class="keyWord">
                            <span v-for="(item, index) in item.keywords.slice(0,3)" :key="index">{{item}}</span>
                            <!-- <span>情况情况</span><span>情况</span> -->
                        </div>
                    </div>
                    </router-link>
                </div>
                <!-- <div>
                    <div>
                        <div class="item clearFixed">
                            <div>
                                <p>都市</p>
                            </div>
                            <div class="allImgs">
                                <img src="http://127.0.0.1:3000/xiandai1.PNG" alt="">
                            </div>
                        </div>
                        <div class="keyWord">
                            <span>情况</span><span>情况情况</span><span>情况</span>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <Footer :barNo="barNo"></Footer>
    </div>
</template>
<script>
import Footer from "../components/Footer"
import Header from "../components/Header"
export default {
    name:"Classify",
    data(){
        return {
            barNo:3,
            classifyList:[],
            kws:[]
        }
    },
    methods:{
        loadAll(){ 
            this.axios.get("http://127.0.0.1:3000/product/classifyList").then((result)=>{
                this.classifyList=result.data.msg;
                for (let index = 0; index < this.classifyList.length; index++) {
                    this.kws[index]=this.classifyList[index].keywords.split("、");
                    this.classifyList[index].keywords=this.kws[index];
                }
            });
        }
    },
    created(){
        this.loadAll();
    },
    components:{
        Footer,
        Header
    }
}
</script>
<style scoped>
.keyWords{
    margin: 0.6rem 1rem 1.5rem 1rem ;
}
.keyWords>span{
    border: 1px solid #eee;
    padding: 0.3rem 0.6rem;
    font-size: 0.9em;
    color: #555;
    border-radius: 20%;
    margin: 0 0.3rem 0 0 ;
}
.main{
    background: rgba(91, 103, 114,0.1);
    width: 100%;
    padding: 1.5rem 0;
}
.main>div{
    width: 100%;
    padding: 0 0.5rem;
}

.main a{
    display: block;
    text-decoration: none;
}
.main>div>div{
    width: 50%;
    float: left;
    padding: 0.5rem 0.5rem;
}
.main>div>div>a>div{
    width: 100%;
    background: #fff;
}
.main .item{
    height: 100%;
    width: 100%;
}
.main .item>div{
    float: left;
}
.main .item>div:first-child{
    width: 50%;
    height: 100%;
    margin: 0 auto;
}
.main .item>div:first-child p{
    /* position: absolute; */
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 1.4em;
    line-height: 1.6rem;
    margin: 1.8rem 0 0 0;
}
.main .item>div:last-child{
    width: 50%;
    height: 100%;
}
.main .keyWord{
    padding: 0.3rem 0 0.6rem 0;
    overflow: hidden;
    white-space: nowrap;
}
.main .keyWord>span{
    padding-left: 0.5rem;
    font-size: 0.9em;
    color: #999
}


.main .item .allImgs{
    width: 100%;
}
.main .item .allImgs>img{
    width: 75%;
    margin: 1rem auto 0;
    display: block;
}
/* .main .item .allImgs>img{
    position: absolute;
    bottom: 10%;
    display: block;
}
.main .item .allImgs>img:nth-child(1){
    width: 25%;
    left: 20%

}
.main .item .allImgs>img:nth-child(2){
    width: 35%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    
}
.main .item .allImgs>img:nth-child(3){
    width: 25%;
    right: 20%;
    
}  */
.title{
    height: 2rem;
    padding: 0 1rem;
    margin-top: 0.8rem;
}
.title>div{
    float: left;
    line-height: 2rem;
    font-size: 0.9em;
    color: #999
}
.title>div:last-child{
    float: right;
    font-size: 0.9em;
}
.title>div:last-child>img{
    height: 1rem;
    vertical-align: middle
}
.clearFixed::after{
    content: "";
    display: block;
    clear: both;
    }
</style>
