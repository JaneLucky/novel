<template>
    <div class="container">
        <div class="search">
            <span>全部</span>
            <span v-for="(item, index) in allList" :key="index">{{item}}</span>
            <!-- <span>爱情</span>
            <span>都市</span>
            <span>都市</span>
            <span>全部</span>
            <span>都市</span>
            <span>爱情</span>
            <span>都市</span>
            <span>都市</span> -->
        </div>
    </div>
</template>
<script>
export default {
    props:["allList"],
    name:"SearchList",
    data(){
        return {}
    },
}
</script>
<style scoped>
.container{
    border-bottom: 1px solid #eee;
}
.search{
    margin: 0.8rem;
    line-height: 2rem;
}
.search>span:first-child{
    color: #4cb3b2;
    border: 1px solid #4cb3b2;
    padding: 0.2rem 0.5rem;
    border-radius: 30%;
}
.search>span+span{
    padding-left: 0.8rem;
    color: #333;
    font-size: 1rem;
}
</style>

