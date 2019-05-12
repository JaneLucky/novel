<template>
    <div>
        <Header></Header>
        <div class="keywords">
            <SearchList :allList="keywords"></SearchList>
        </div>
        <div class="wordNum">
            <SearchList :allList="wordNum"></SearchList>
        </div>
        <div class="status">
            <SearchList :allList="status"></SearchList>
        </div>
        <div class="main">
            <div></div>
            <BookItem></BookItem>
        </div>
        <Footer :barNo="barNo"></Footer>
    </div>
</template>
<script>
import Footer from "../components/Footer"
import SearchList from "../components/SearchList"
import BookItem from "../components/BookItem"
import Header from "../components/Header"
export default {
    name:"Category",
    data(){
        return {
            barNo:3,
            keywords:["总裁","娇妻","幸福","青梅竹马","甜文","宫斗","爱情","神医","穿越"],
            wordNum:["20万字以下","20-100万字","100万字以上"],
            status:["最新","完结"],

        }
    },
    components:{
        Footer,
        SearchList,
        BookItem,
        Header
    }
}
</script>
