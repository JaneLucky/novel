<template>
    <div>
        <Header></Header>
        <div class="main">
            <div class="line">
            </div>
            <div class="clearFixed title">
                <div class="line">
                </div>
                <div>{{floorTitle}}</div>
            </div>
            <div class="main">
                <div class="item clearFlex" v-for="(item, index) in rankList" :key="index">
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
                                <span>{{item.status}}</span>
                            </div>
                        </div>
                    </router-link>
                </div>
                <!-- <div class="item clearFlex">
                    <div class="img">
                        <img src="http://127.0.0.1:3000/male_wuxia3.jpg" alt="">
                    </div>
                    <div class="txt">
                        <h3>万界神尊</h3>
                        <p>万千世界，各族争锋；亿万天才，群雄逐鹿。遭人陷害而死的赵若尘逆天改命，重回十六岁。这一世，他势必要弥补所有遗憾，再次追逐武</p>
                        <div>
                            <span>鱼非鱼</span>
                            <span>111万</span>
                            <span>连载</span>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <Footer :barNo="barNo"></Footer>
    </div>
</template>
<script>
import Footer  from "../components/Footer"
import BookItem  from "../components/BookItem"
import Header from "../components/Header"
export default {
    name:"RankCategory",
    data(){
        return {
            barNo:3,
            gender_id:3,
            status:3,
            rankList:[],
            floorTitle:""
        }
    },
    methods:{
        loadBookList(){
            this.axios.get("http://127.0.0.1:3000/product/rankItems",{
                params:{    
                    gender_id:this.gender_id,
                    status:this.status
                }
            }).then((result)=>{
                // console.table(result.data.msg);
                this.rankList=result.data.msg;
                
                if(this.status==3){
                    this.floorTitle="综合人气榜"
                }else if(this.status==2){
                    this.floorTitle="连载榜"
                }else{
                    this.floorTitle="完结榜"

                }
            })
        }
    },
    components:{
        BookItem,
        Footer,
        Header
    },
    created(){
        this.gender_id=this.$route.query.gender_id;
        this.status=this.$route.query.status;
        // console.log(this.gender_id);
        // console.log(this.status);
        this.loadBookList();
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
    font-weight: bold;
}
.title>.line{
    width: 0.3em;
    height:1.5rem;
    background: #4cb3b2;
    margin: 0.25rem 0.25rem 0 0.5rem;
}
.container{
    padding: 0;
    margin: 0;
}
.main{
    padding: 0.6rem 0 0.8rem;
}
.item{
    padding: 0 1rem 0.5rem;
}
.item div{
    float: left;
}
.item .img{
    width: 25%;
}
.item .txt{
    width: 75%;
    padding-left: 0.8rem;
}
.item .img img{
    width: 100%;
}
.line{
    width: 100%;
    height: 0.5rem;
    background: rgba(128,128,128, 0.1);
}
.clearFlex::after{
    content: "";
    clear: both;
    display:block;
}
.item .txt>p{
    font-size: 0.9rem;
    color:#888;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.item .txt>h3{
    font-weight: normal;
    font-size: 1.2rem;
    color:#333;
    margin-bottom: 0.5rem;
}
.item .txt>div>span{
    float:right;
    border: 1px solid #eee;
    font-size: 0.8rem;
    color:#888;
}
.item .txt>div>span+span{
    margin-left: 0.5rem;
    padding: 0.1rem 0.3rem;
}
.item .txt>div>span:first-child{
    float: left;
    font-size: 0.9rem;
    color:#888;
    border: none;
}
.item .txt>div>span:last-child{
    color: #4cb3b2;
}
</style>

