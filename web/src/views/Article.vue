<template>
    <div class="container" style="margin-bottom:0;padding-bottom:0">
        <Header></Header>
        <div class="session" v-tap.stop="showControls" :class="flagToggle?'toggleWhite':'toggleBlack'">
            <div class="top" v-show="ifshowControls">
                <p>{{groupTitle}}</p>
                <p v-tap="toBookShelf">书架</p>
            </div>
            <div class="main" v-swipeleft="toNextPage" v-swiperight="toPrevPage">
                <h3>{{title}}</h3>
                <p v-for="(item, index) in article" :key="index">{{item}}</p>
            </div>

            <div class="bottom" v-show="ifshowControls" @click.stop="awaysShow">
                <ul>
                    <li v-tap="toContentList">
                        <img src="http://127.0.0.1:3000/bookList.png" alt="">
                        <p>目录</p>
                    </li>
                    <li v-tap="toToggle">
                        <img :src="toggleImg" alt="">
                        <p>{{flagToggle?"夜间":"白天"}}</p>
                        </li>
                    <li>
                        <img src="http://127.0.0.1:3000/reset.png" alt="">
                        <p>设置</p>
                    </li>
                    <li v-tap="toBookIndex">
                        <img src="http://127.0.0.1:3000/book.png" alt="">
                        <p>封面</p>
                    </li>
                </ul>
            </div>
            <!-- <div class="boolList" @click.stop="userClick=true">
                <ul>
                    <li v-for="(item, index) in titleList" :key="index">
                        <router-link :to="`/article?bid=${bid}&sid=${parseInt(item)}`">{{item}}</router-link>
                    </li>
                </ul>
            </div> -->
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import Header from "../components/Header"
export default {
    name:"Article",
    data(){
        return {
            bid:null,
            sid:null,
            scrTop:null,
            article:"",
            title:"",
            len:1,
            ifshowControls:false,
            groupTitle:"",
            titleList:[],
            flagToggle:true,
            toggleImg:"http://127.0.0.1:3000/black.png"
        }
    },
    methods:{
        awaysShow(){
            this.ifshowControls=true;
        },
        toToggle(){
            if(this.flagToggle){
                this.toggleImg="http://127.0.0.1:3000/white.png";
                this.flagToggle=false;
            }else{
                this.toggleImg="http://127.0.0.1:3000/black.png";
                this.flagToggle=true;
            }
        },
        toContentList(){
            this.$router.push(`/contentList?bid=${this.bid}`);
        },
        loadDetails(){
            this.axios.get("http://127.0.0.1:3000/book/article",{
                params:{
                    bid:this.bid,
                    sid:this.sid
                }
            }).then((result)=>{
                // console.log(result.data);
                this.article=result.data.msg;
                this.title=result.data.title
                // console.log(this.article);
                this.len=result.data.len;
                this.groupTitle=result.data.groupTitle;
                // console.log(this.groupTitle);
                this.titleList=result.data.titleList;
                console.log(this.titleList);
            });
        },
        toNextPage(){
            if(parseInt(this.sid)>=this.len){
                Toast("已经是最后一章了");
            }else{
                this.sid=parseInt(this.sid)+1;
                this.$router.push(`/article?bid=${this.bid}&sid=${this.sid}&scrTop=0`);
            }
        },
        toPrevPage(){
            if(parseInt(this.sid)==1){
                Toast("已经是第一章了");
            }else{
                this.sid=parseInt(this.sid)-1;
                this.$router.push(`/article?bid=${this.bid}&sid=${this.sid}&scrTop=0`);
            }
        },
        //显示和隐藏控件按钮（头部和底部）
        showControls(){
            if(this.ifshowControls==false){
                this.ifshowControls=true;
            }else{
                this.ifshowControls=false;
            }
        },
        toBookIndex(){
            this.$router.push(`/detailList?bid=${this.bid}`);
        },
        //回到书架
        toBookShelf(){
            this.$router.push("/myBook");
        }
    },
    mounted(){
        let _this=this
        window.addEventListener('scroll',function(){
        let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset//要做兼容 在模拟器能正常获取scrolltop在微信h5页面和手机的浏览器页面一直为0
            // console.log(top);
        });
            document.documentElement.scrollTop=100;

    },
    created(){
        // localStorage.clear();
        this.bid=this.$route.query.bid;
        this.sid=this.$route.query.sid;
        this.loadDetails();
        // console.table(localStorage);
        if(!this.checkStorage(this.bid)){
            this.addToStorage(this.bid);
        }else{
            // console.log(this.bid,this.sid);
            // console.table(document.documentElement.scrollTop);
            this.setLocalStorage(this.bid,this.sid,0);
        }
        // console.table(localStorage);

    },
    watch:{
        "$route"(){
            this.bid=this.$route.query.bid;
            this.sid=this.$route.query.sid;
            this.loadDetails();
        }
    },
    components:{
        Header
    }
}
</script>
<style scoped>
ul li{
    margin: 0;
    padding: 0;
    list-style: none;
}
.container .session .boolList{
    position: fixed;
    width: 80%;
    height: 100%;
    background:Ivory;
    top: 0;
    left: 0;
}
.toggleWhite{
    background: #fff;
}
.toggleBlack{
    background: #888;
}
.toggleBlack h3{
    color: #ccc;
}
.toggleBlack p{
    color: #ccc;
}
.container .session .boolList ul{
    padding: 3rem;
}
.container .session .boolList ul li{
    padding: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.container .session .boolList ul li a{
    color: #888;
    font-size: 1.2rem;
}


.container .top,.container .bottom{
    background: #54C6C5;
    width: 100%;
    position: fixed;
    height: 5rem;
}
.container .top{
    top:0;
}
.container .bottom{
    bottom:0;
}
.container .top p:first-child{
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
.container .top p:last-child{
    color: #fff;
    position: absolute;
    bottom: 0;
    right: 1rem;
    border: 1px solid #fff;
    padding: 0 0.5rem;

}
.container .bottom ul{
    margin: 0;
    padding: 0.8rem 0 0 0;
    display: flex;
    justify-content: space-around;
}
.container .bottom ul>li{
    width: 25%;
    margin: 0 auto;
    text-align: center;
}
.container .bottom ul>li img{
    width:30%;
    margin: 0 auto;
    text-align: center;
}
.container .bottom ul>li p{
    color:#fff;
    margin: 0 auto;
    text-align: center;
}















.clearFixed::after{
    content: "";
    display: block;
    clear: both;
}
.container .main{
    margin: 0 1rem;
    padding: 6rem 0;
}
.container .main p{
    font-size:1.2rem;
    line-height: 1.8rem;
}
.container .main h3{
    padding: 0 1rem 1rem 1rem;
}
</style>

