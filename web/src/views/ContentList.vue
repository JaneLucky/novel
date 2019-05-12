<template>
    <div class="container">
        <Header></Header>
        <div class="totalCount clearFixed">
            <div>共{{contentList.length}}章</div>
            <div>
                <img :src="descImg" alt="" @click="changeImg">
            </div>
        </div>
        <ul>
            <li v-for="(item,index) in contentList" :key="index">
                <router-link :to="`/article?bid=${bid}&sid=${parseInt(item)}`">{{item}}</router-link>
            </li>
        </ul>
        <div :style="hiddenList" class="noList">目前没有对应的数据</div>

    </div>
</template>
<script>
import Header from "../components/Header"
export default {
    name:"ContentList",
    data(){
        return {
            bid:null,
            contentList:[],
            desc:false,
            descImg:"http://127.0.0.1:3000/asc.PNG",
            hiddenList:{
                display:"none"
            }

        }
    },
    methods:{
        changeImg(){
            if(!this.desc){
                this.descImg="http://127.0.0.1:3000/desc.PNG";
                this.contentList=this.contentList.reverse();
                this.desc=true;
            }else{
                this.descImg="http://127.0.0.1:3000/asc.PNG";
                this.contentList=this.contentList.reverse();
                this.desc=false;
            }
        },
        loadList(){
            this.axios.get("http://127.0.0.1:3000/book/details",{
                params:{
                    bid:this.bid
                }
            }).then((result)=>{
                this.contentList=result.data.msg;
                console.log(this.contentList);
                if(result.data.msg.length==0){
                    this.hiddenList.display="block";
                }
            })
        }
    },
    created(){
        this.bid=this.$route.query.bid;
        this.loadList();
    },
    components:{
        Header
    }
}
</script>
<style scoped>
.noList{
    text-align: center;            
    color:"#666";
    height: 5rem;
    line-height: 10rem;
}
body,ul,li{
    margin: 0;
    padding: 0;
}
ul>li{
    list-style: none;
}
ul>li a{
    color: #888;
}
.totalCount{
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    padding: 0.6rem 0.3rem;
    color: #666;
}
.totalCount div:first-child{
    font-size: 1.2rem;
    float: left;
    line-height: 2rem;
}
.totalCount div:last-child{
    width: 9%;
    float: right;
}
.totalCount div img{
    display: block;
    width: 100%;
}




ul>li{
    padding: 1rem 1rem;
    border-bottom: 0.5px solid #eee;
    color: #666;
}
ul>li a{
    width: 100%;
    display: block;
}
.clearFixed::after{
    content: "";
    display: block;
    clear: both;
    }

</style>
