<template>
    <div class="container">
        <Header></Header>
        <Carousel1></Carousel1>
        <Carousel2 :sayGoodList="sayGoodList" :sayGoodTitle="sayGoodTitle"></Carousel2>
        <middleGood :floorTitle="floor1Title" :quality="quality.slice(0,5)" :pno="pnoQuality" :allno="allnoQuality"></middleGood>
        
        <Recommend :recommend="output.proList" :floorTitle="floor2Title" :isShowTop="isShowTop"></Recommend>
        
        <Footer :barNo="barNo"></Footer>
    </div>
</template>
<script src="../lib/mui/js/mui.js">
</script> 
<script>
import { Toast } from 'mint-ui';
import Carousel1 from "../components/Carousel1"
import Carousel2 from "../components/Carousel2"
import middleGood from "../components/middleGood"
import Recommend from "../components/Recommend"
import Footer from "../components/Footer"
import Header from "../components/Header"
export default {
    data(){
        return {
            barNo:3,
            gender:2,
            isShowTop:false,
            getBck:"",
            output:{
                pno:0,
                pCount:0,
                pSize:8,
                proList:[]
            },
            pnoRe:0, //用于标记精品推荐的分页中的第几页
            allnoRe:0,//用于标记精品推荐的总页数
            recommend:[],  //推荐的小说
            floor2Title:"男生都爱看的书",

            pnoQuality:0,//用于标记人气最热的分页中的第几页
            allnoQuality:0,//用于标记人气最热的总页数
            quality:[],  //人气最热的小说数组
            floor1Title:"人气最热",

            sayGoodTitle:"90%的男生看了都说好",
            sayGoodList:[],
        }
    },
    methods:{
        getFocus(){
            this.getBck="colorGray"
        },
        getBlur(){
            this.getBck=""
        },
        loadAll(){
            this.axios.get("http://127.0.0.1:3000/product/list",{
                params:{
                    pno:this.output.pno,
                    gender_id:this.gender
                }
            }).then((result)=>{
                // a.concat(b)
                this.output.proList=this.output.proList.concat(result.data.proList);
                this.output.pno=result.data.pno;
                this.output.pCount=result.data.pCount;
                // console.log(this.output);
            })
        },
        getMore(){
            if(this.output.pno < this.output.pCount){
                this.loadAll();
            }else{
                Toast("没有更多商品了...");
                return;
            }
        },
        //用于请求人气最热的数据
        loadQuality(){
            this.axios.get("http://127.0.0.1:3000/product/quality",{
                 params:{
                    pnoQuality:this.pnoQuality,
                    gender_id:this.gender
                }
            }).then((result)=>{
                this.quality=result.data.msg;
                this.pnoQuality=result.data.pnoQuality;
                this.allnoQuality=result.data.allnoQuality;
            })
        },
        //90%的女生看了都说好
        loadSayGood(){
            this.axios.get("http://127.0.0.1:3000/product/sayGood",{
                params:{
                    gender_id:this.gender
                    }
            }).then((result)=>{
                // console.log(result.data.msg);
                this.sayGoodList=result.data.msg;
            });
        }

    },
    components:{
        Carousel1,
        middleGood,
        Recommend,
        Footer,
        Carousel2,
        Header
    },
    created(){
        this.loadSayGood();
        this.loadQuality();
        this.loadAll();
    }
}
</script>
<style scoped>
.active>.mui-tab-label{
    color: #4cb3b2;
}
.mui-bar>a:nth-child(1).active>span.mui-icon{
    background:url(http://127.0.0.1:3000/book_select.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
.mui-bar>a:nth-child(2).active>span.mui-icon{
    background:url(http://127.0.0.1:3000/free_select.jpg) no-repeat;
    background-size:1.5rem 2rem;
    background-position:center -0.2rem;
}
.mui-bar>a:nth-child(3).active>span.mui-icon{
    background:url(http://127.0.0.1:3000/city_select.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
.mui-bar>a:nth-child(4).active>span.mui-icon{
    background:url(http://127.0.0.1:3000/me_select.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
.mui-bar>a:nth-child(1)>span.mui-icon{
    background:url(http://127.0.0.1:3000/book.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
.mui-bar>a:nth-child(2)>span.mui-icon{
    background:url(http://127.0.0.1:3000/free.jpg) no-repeat;
    background-size:1.5rem 2rem;
    background-position:center -0.2rem;
}
.mui-bar>a:nth-child(3)>span.mui-icon{
    background:url(http://127.0.0.1:3000/city.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
.mui-bar>a:nth-child(4)>span.mui-icon{
    background:url(http://127.0.0.1:3000/me.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
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

