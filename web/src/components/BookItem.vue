<template>
    <div class="container">
        <div class="line">
        </div>
        <div class="main">
            <div class="item clearFlex" v-for="(item, index) in bookItenList" :key="index">
                <router-link :to="`/detailList?bid=${item.bid}`">
                    <div class="img">
                        <img :src="item.pic" alt="">
                    </div>
                    <div class="txt">
                        <h3>{{item.title}}</h3>
                        <p>{{item.description}}</p>
                        <div>
                            <span>{{item.author}}</span>
                            <span>{{item.size}}</span>
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
</template>
<script>
export default {
    name:"BookItem",
    data(){
        return {
            fid:null,
            bookItenList:[]
        }
    },
    methods:{
        loadBookItem(){
            this.axios.get("http://127.0.0.1:3000/product/bookItem",{
                params:{
                    fid:this.fid
                }
            }).then((result)=>{
                // console.table(result.data.msg);
                this.bookItenList=result.data.msg;
            });
        }
            
    },
    created(){
        this.fid=this.$route.query.fid;
        // console.log(this.fid);
        this.loadBookItem();
    }
}
</script>
<style scoped>
.container{
    padding: 0;
    margin: 0;
}
.container .main{
    padding: 0.7rem 0;
}
.container .item{
    padding: 0.3rem 1rem;
}
.container .item div{
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
.container>.line{
    width: 100%;
    height: 0.5rem;
    background: rgba(128,128,128, 0.1);
}
.clearFlex::after{
    content: "";
    clear: both;
    display:block;
}
.container .item .txt>p{
    font-size: 0.9rem;
    color:#888;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.container .item .txt>h3{
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
