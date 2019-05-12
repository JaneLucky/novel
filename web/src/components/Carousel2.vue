<template>
    <div class="container">    
        <div class="carousel"> 
            <div class="clearFixed title">
                <div class="line">
                </div>
                <div>{{sayGoodTitle}}</div>
            </div>
            <ul class="clearFixed" v-bind:style="moveToLeft">
                <li @click="marginToLeft" v-for="(item,index) of sayGoodList" :key="index">
                    <div class="clearFixed">
                        <div>
                            <img :src="item.pic" alt="">
                        </div>
                        <div>
                            <h3>{{item.title}}</h3>
                            <p>{{item.description}}</p>
                        </div>
                    </div>
                </li>
                <!-- <li @click="marginToLeft">
                    <div class="clearFixed">
                        <div>
                            <img src="http://127.0.0.1:3000/book-book-007.png" alt="">
                        </div>
                        <div>
                            <h3>农门书香2</h3>
                            <p>用于代替span在页面中呈现小计，总价之类的数据用于代替span在页面中呈现小计，总价之类的数据用于代替span在页面中呈现小计，总价之类的数据</p>
                        </div>
                    </div>
                </li>-->
            </ul>
        </div>    
        <div class="bigLine"></div>
    </div>
</template>
<script>
export default {
    name:"Carousel2",
    props:["sayGoodList","sayGoodTitle"],
    data(){
        return {
            moveToLeft: {
                marginLeft:"0",
                transition: "1s"
            }
        }
    },
    methods:{
        marginToLeft(){
            var now=this.moveToLeft.marginLeft.split("%")[0] ;
            // console.log(now);
            if(now>-225){
                this.moveToLeft.marginLeft=now-75+"%";
            }if(now==-225){
                this.moveToLeft.marginLeft="-275%";
            }
        }
    }
}
</script>
<style scoped>
.container{
    width: 100%;
}
.container .carousel{
    width: 100%;
}
ul>li{
    margin: 0;
    padding: 0;
    list-style: none;
}
.container .carousel>ul{
    width: 375%;
    padding: 0;
    margin: 0;
}
.container .carousel>ul>li{
    float: left;
    width: 20%;
    padding: 0.5rem;
}
.container .carousel>ul>li>div{
    border: 0.05rem solid lightgray;
    box-sizing: border-box;
    padding: 0.5rem 0.3rem;
}
li>div>div:first-child{
    width: 35%;
    float: left;
}
li img{
    width: 100%;
}
li>div>div:last-child{
    width: 65%;
    float: left;
}
.clearFixed::after{
    content: "";
    display: block;
    clear: both;
    }

.container .bigLine{
    width: 100%;
    height: 0.5rem;
    background: rgba(128,128,128, 0.1);
    margin: 0.5rem 0 1rem 0;
}
.title{
    height: 2rem;
    margin: 1.2rem 0 0 0;
}
.title>div{
    float: left;
    line-height: 2rem;
    font-size: 1em;
    font-weight: bold;
    color: #666
}
.title>div:last-child{
    float: left;
    margin-right: 0.8rem;
}
.title>.line{
    width: 0.3rem;
    height:1.5rem;
    background: #4cb3b2;
    margin: 0.25rem 0.25rem 0.25rem 0.5rem;
}
.container ul>li>div>div{
    padding: 0.5rem 0.3rem 0 0.5rem;
}
.container ul>li>div>div>h3{
    /* padding-top: 0.5rem; */
    color:#333;
    font-size: 1rem;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
    word-break: break-all;
    text-align: left;
    font-weight: bold;
}
.container ul>li>div>div>p{
    font-size: 0.9rem;
    line-height: 1.2rem;
    color:#888;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin-top: .16rem;
    max-height: 100%;
    font-weight: bold;
    padding-top: 0.5rem;
}
</style>
