<template>
    <div class="container">
        <Header></Header>
        <div class="nav">
            <ul>
                <li @click="changeClickNum(3)">
                    <div>综合</div>
                    <p :class="clickNum==3?'classClickItem':''"></p>
                </li>
                <li @click="changeClickNum(2)">
                    <div>男生</div>
                    <p :class="clickNum==2?'classClickItem':''"></p>
                </li>
                <li @click="changeClickNum(1)">
                    <div>女生</div>
                    <p :class="clickNum==1?'classClickItem':''"></p>
                </li>
            </ul>
        </div>
        <div class="main">
            <router-link :to="`/rankCategory?gender_id=${item.gender_id}&status=${item.status}`" v-for="(item, index) in rankList" :key="index">
                <div class="item">
                        <div class="img">
                            <img :src="item.pic" alt="">
                        </div>
                        <div class="txt">
                            <div class="clearFlex">
                                <div>{{item.rank_title}}</div>
                                <p>&gt;</p>
                            </div>
                        </div>
                </div>
            </router-link>
            <!-- <router-link to="/rankCategory">
                <div class="item">
                    <div class="img">
                        <img src="http://127.0.0.1:3000/dushi5.PNG" alt="">
                    </div>
                    <div class="txt">
                        <div class=" clearFlex">
                            <div>连载榜</div>
                            <p>&gt;</p>
                        </div>
                    </div>
                </div>
            </router-link>
            <router-link to="/rankCategory">
                <div class="item">
                    <div class="img">
                        <img src="http://127.0.0.1:3000/xiandai1.PNG" alt="">
                    </div>
                    <div class="txt">
                        <div class=" clearFlex">
                            <div>完结榜</div>
                            <p>&gt;</p>
                        </div>
                    </div>
                </div>
            </router-link>
            <router-link to="/rankCategory">
                <div class="item">
                    <div class="img">
                        <img src="http://127.0.0.1:3000/youxi7.PNG" alt="">
                    </div>
                    <div class="txt">
                        <div class=" clearFlex">
                            <div>书友推荐榜</div>
                            <p>&gt;</p>
                        </div>
                    </div>
                </div>
            </router-link>
            <router-link to="/rankCategory">
                <div class="item">
                    <div class="img">
                        <img src="http://127.0.0.1:3000/wuxia8.PNG" alt="">
                    </div>
                    <div class="txt">
                        <div class=" clearFlex">
                            <div>原创点击榜</div>
                            <p>&gt;</p>
                        </div>
                    </div>
                </div>
            </router-link>
            <router-link to="/rankCategory">
                <div class="item">
                    <div class="img">
                        <img src="http://127.0.0.1:3000/huanyan3.PNG" alt="">
                    </div>
                    <div class="txt">
                        <div class=" clearFlex">
                            <div>大神力作榜</div>
                            <p>&gt;</p>
                        </div>
                    </div>
                </div>
            </router-link> -->
        </div>

        <Footer :barNo="barNo"></Footer>
    </div>
</template>
<script>
import Footer from "../components/Footer"
import Header from "../components/Header"
export default {
    name:"RankList",
    data(){
        return {
            barNo:3,
            clickNum:3,
            getFocus:0,
            rankList:[],
        }
    },
    methods:{
        changeClickNum(num){
            this.clickNum=num;
        },
        loadList(id){
            this.rankList=[];
            this.axios.get("http://127.0.0.1:3000/product/rankList",{
                params:{
                    rank_id:id
                }
            }).then((result)=>{
                // console.log(result.data.msg);
                this.rankList=result.data.msg;
            });
        }
    },
    created(){
        this.loadList(3);
    },
    components:{
        Footer,
        Header
    },
    watch:{
        clickNum(){
            this.loadList(this.clickNum);
        }
    }
}
</script>
<style scoped>
ul,li,p,h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}
ul>li{
    list-style: none;
}
a{
    color: #333;
}
ul{
    width: 100%;
    display:flex;
    justify-content: space-around;
    margin: 0.8rem 0;
    border-bottom: 1px solid #eee;
}
.clearFlex::after{
    content: "";
    display: block;
    clear: both;
}
ul>li>p{
    margin-top: 0.6rem;
    width: 2rem;
    border: 1px solid #fff;
}
.classClickItem{
    border: 1px solid #4cb3b2;
}

.main .item{
    padding: 0.6rem 1rem;  
    border-bottom: 1px solid #eee;  
    display: flex;
    justify-content: space-around;
}
.main .item>.img{
    width: 30%;
}
.main .item>.img img{
    width: 100%;
    display: block;
}
.main .item>.txt{
    width: 70%;
}
.main .item>.txt>div{
    height: 100%;
    width: 100%;
    position: relative;
    font-weight: bolder;
    color: #555;
}
.main .item>.txt>div>div{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1.5rem;
}
.main .item>.txt>div>p{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}

.clearFlex::after{
    content: "";
    clear: both;
    display:block;
}

</style>

