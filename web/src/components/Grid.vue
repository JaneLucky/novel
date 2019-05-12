<template>
    <ul class="clearFixed">
        <li>
            <router-link to="/classify">
                <div>
                    <img src="http://127.0.0.1:3000/book-head-001.png" alt="">
                </div>
                <div>分类</div>
            </router-link>
        </li>
        <li>
            <router-link to="/rankList">
                <div>
                    <img src="http://127.0.0.1:3000/book-head-002.png" alt="">
                </div>
                <div>排行</div>
            </router-link>
        </li>
        <li>
            <router-link to="/femaleList">
                <div>
                    <img src="http://127.0.0.1:3000/book-head-003.png" alt="">
                </div>
                <div>女生</div>
            </router-link>
        </li>
        <li>
            <router-link to="/maleList">
                <div>
                    <img src="http://127.0.0.1:3000/book-head-004.png" alt="">
                </div>
                <div>男生</div>
            </router-link>
        </li>
        <li>
            <router-link to="/overList">
                <div>
                    <img src="http://127.0.0.1:3000/book-head-005.png" alt="">
                </div>
                <div>完结</div>
            </router-link>
        </li>
    </ul>
</template>
<script>
export default {
    name:"Grid",
    data(){
        return {}
    }
}
</script>
<style scoped>
    *{
        margin: 0 ;
        padding: 0;
    }
    ul{
        margin: 0.8rem 0;
    }
    ul>li{
        list-style: none;
        float: left;
        width: 20%;
        padding: 0 0.8rem;
        font-size: 0.8rem;
    }
    ul>li>a{
        display: block;
        color: #333;
    }
    ul>li>a>div>img{
        display: block;
        width: 100%;
    }
    ul>li>a>div:last-child{
        text-align: center;
    }
    .clearFixed::after{
        content: "";
        display: block;
        clear: both;
    }
    ul>li>a>div:last-child{
            font-size:0.9rem;
    }
</style>

