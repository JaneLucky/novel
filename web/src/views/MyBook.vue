<template>
    <div class="container">
        <Header></Header>
        <div class="top">
            <div class="mainBook clearFixed" v-for="(item, index) in list.slice(0,1)" :key="index">
                <router-link :to="`/article?bid=${item.bid}&sid=${item.sid}&scrTop=${item.scrTop}`">
                    <div>
                        <img :src="item.pic" alt="">
                    </div>
                    <div>
                        <h3>{{item.title}}</h3>
                        <p>继续阅读 <span>&gt;</span></p>
                    </div>
                </router-link>
            </div>
        </div>    
        <div class="main">
            <ul class="">
                <li v-for="(item, index) in list.slice(1,)" :key="index">
                    <router-link :to="`/article?bid=${item.bid}&sid=${item.sid}`">
                        <div>
                            <img :src="item.pic" alt="">
                        </div>
                        <p>{{item.title}}</p>
                    </router-link>
                </li>
                <!-- <li>
                    <router-link to="/index">
                        <div>
                            <img src="http://127.0.0.1:3000/female_huanyan2.jpg" alt="">
                        </div>
                        <p>腹黑逆天大小姐</p>
                    </router-link>
                </li> -->

                <li>
                    <router-link to="/classify">
                        <div>
                            <img src="http://127.0.0.1:3000/add.png" alt="">
                        </div>
                        <p></p>
                    </router-link>
                </li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <Footer :barNo="barNo"></Footer>
    </div>
</template>
<script>
import Footer from "../components/Footer"
import Header from "../components/Header"
export default {
    name:"MyBook",
    data(){
        return {
            barNo:1,
            scrTop:null,
            queryList:[],
            list:[],
        }
    },
    methods:{
        loadList(){
            this.axios.get("http://127.0.0.1:3000/book/myBook",{
                params:{
                    queryList:this.queryList
                }
            }).then(result=>{
                // console.log(result.data.msg);
                this.list=result.data.msg;
                // console.log(this.list);
                for(var i=0;i<this.list.length;i++){
                    this.list[i].sid=parseInt(this.getLocalStorage(this.list[i].bid).sid) ;
                    this.list[i].scrTop=parseInt(this.getLocalStorage(this.list[i].bid).scrTop);
                }
                // console.table(this.list);
            });
        }
    },
    components:{
        Footer,
        Header
    },
    created(){
        var allList=JSON.parse(localStorage.list);
        // console.table(allList);
        var i=0;
        var queryList=[];
        for (var i=0;i<allList.length;i++) {
            queryList.push(parseInt(allList[i].bid));
        }
        // console.log(queryList);
        this.queryList=queryList.reverse();
        // console.log(this.queryList);
        this.loadList();
    }
}
</script>
<style scoped>
.container .top{
    width: 100%;
    height: 12rem;
    background: rgba(76,179,178, 0.8);
}
.top{
    padding-top: 3rem;
}
.mainBook div{
    float: left;
}
.mainBook a{
    display: block;
}
.clearFixed::after{
    content: "";
    display: block;
    clear: both;
}
.mainBook div:first-child{
    width: 40%;
    text-align: right;
}
.mainBook div:first-child img{
    width: 80%;
    right:0;

}
.mainBook div:last-child{
    width: 60%;
    padding: 2rem 1.6rem 0 1.6rem;
    color: aliceblue;
}
.mainBook div:last-child h3{
    font-weight: normal;
    font-size: 1.2rem;
}
.mainBook div:last-child p{
    width: 100%;
    text-align: left;
    color: rgb(210, 221, 231);
    margin-top: 0.8rem;
}
.mainBook div:last-child p span{
    display: inline-block;
    /* border: 1px solid rgb(210, 221, 231); */
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    border-radius: 50%;
    background: rgb(210, 221, 231);;
    text-align: center;
    color: gray;
}
.main{
    height: 20rem;
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
}
.main ul{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    padding: 0;
    margin: 0;
    
}
ul>li{
    list-style: none;
    padding: 0;
    margin: 1.6rem 0 0 0;
    width: 33.33333%;
}
ul>li img{
    width: 80%;
    display: block;
    margin: 0 auto;
}
ul>li p{
    width: 80%;
    display: block;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.9rem;
}
.clearFixed::after{
    content: "";
    display: block;
    clear: both;
    }
</style>

