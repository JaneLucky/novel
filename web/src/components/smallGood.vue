<template>
    <div>
        <ul class="container">
            <li class="item clearFixed" v-for="(item,index) of recommend" :key="index">
                <router-link :to="`/detailList?bid=${item.bid}`">
                    <div class="left">
                        <img :src="item.pic" alt="">
                    </div>
                    <div class="right">
                        <h3>{{item.title}}</h3>
                        <p>{{item.author}}</p>
                    </div>
                </router-link>
            </li>
            <!-- <li class="item clearFixed">
                <div class="left">
                    <img src="http://127.0.0.1:3000/book-book-007.png" alt="">
                </div>
                <div class="right">
                    <h3>你师父第三</h3>
                    <p>萨达</p>
                </div>
            </li>
            <li class="item clearFixed">
                <div class="left">
                    <img src="http://127.0.0.1:3000/book-book-007.png" alt="">
                </div>
                <div class="right">
                    <h3>你师父第三你师父第三</h3>
                    <p>萨达</p>
                </div>
            </li>
            <li class="item clearFixed">
                <div class="left">
                    <img src="http://127.0.0.1:3000/book-book-007.png" alt="">
                </div>
                <div class="right">
                    <h3>你师父第三</h3>
                    <p>萨达</p>
                </div>
            </li>
            <li class="item clearFixed">
                <div class="left">
                    <img src="http://127.0.0.1:3000/book-book-007.png" alt="">
                </div>
                <div class="right">
                    <h3>你师父第三</h3>
                    <p>萨达</p>
                </div>
            </li> -->
        </ul>
    </div>
</template>
<script>
export default {
    name:"smallGood",
    props:["recommend"],
    data(){
        return {
        }
    }
}
</script>

<style scoped>
    ul>li{
        list-style: none
    }
    .container{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        padding: 0 0.3rem 0;
        margin: 0 auto 0.5rem;

    }
    .container .item{
        width: 50%;
        box-sizing: border-box;
        padding: 0 0.3rem 0 0.3rem;
    }
    .container .item div{
        float: left;
    }
    .container .item .left{
        width: 30%;
    }
    .container .item .right{
        width: 60%;
        padding: 0.3rem 0 0 0.5rem;
    }
    .container .item img{
        width: 100%;
        display: block;
        margin: 0 auto 0.5rem;
        
    }
    .container .item div>p{
        color:#888;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: break-word;
        word-break: break-all;
        text-align: left;
    }
    .container .item div>h3{
        color:#333;
        font-size: 1rem;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: break-word;
        word-break: break-all;
        text-align: left;
    }
    .clearFixed::after{
        content: "";
        display: block;
        clear: both;
        }

</style>
