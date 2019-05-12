<template>
        <ul class="container">
            <li class="item" v-for="(item, index) in proList" :key="index">
                <div>
                    <img v-lazy="item.pic" alt="">
                    <p>{{item.pname}}</p>
                    <p>¥ {{item.price.toFixed(2)}}</p>
                </div>
            </li>
        </ul>
        <!-- <div class="item" v-for="(item, index) in proList" :key="index">
            <div>
                <img src="http://127.0.0.1:3000/wedding.jpg" alt="">
                <p>{{item.pname}}</p>
                <p>¥ {{item.price.toFixed(2)}}</p>
            </div>
        </div> -->
        <!-- <div class="item">
            <div>
                <img src="http://127.0.0.1:3000/wedding.jpg" alt="">
                <p>巴黎婚纱</p>
                <p>¥ 19999.00</p>
            </div>
        </div>
        <div class="item">
            <div>
                <img src="http://127.0.0.1:3000/wedding.jpg" alt="">
                <p>巴黎婚纱</p>
                <p>¥ 19999.00</p>
            </div>
        </div>
        <div class="item">
            <div>
                <img src="http://127.0.0.1:3000/wedding.jpg" alt="">
                <p>巴黎婚纱</p>
                <p>¥ 19999.00</p>
            </div>
        </div> -->
</template>
<script>
export default {
    name:"GoodList",
    props:["proList"],
    data(){
        return {
            
        }
    },
    methods:{
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
        margin: 0 auto;
        padding: 0;
    }
    .container .item{
        width: 33.33333333%;
        box-sizing: border-box;
    }
    .container .item>div{
        /* margin: 0.6rem; */
        text-align: center;
        border: 1px solid lightgray;
        border-radius: 10px;
        overflow: hidden;
    }
    .container .item:nth-child(2n+1)>div{
        margin: 0.8rem 0.4rem 0.4rem 0.8rem;
    }
    .container .item:nth-child(2n)>div{
        margin: 0.8rem 0.8rem 0.4rem 0.4rem;
    }
    .container .item img{
        width: 100%;
        display: block;
        margin: 0 auto 1rem;
        
    }
    .container .item>div>p{
        color:#666;
        font-size: 1rem;
        font-weight: bold;
        margin:0
    }
    .container .item>div>p:last-child{
        color:#888;
        font-size: 1rem;
        margin-bottom: 0.5rem
    }

</style>
