<template>
    <div class="container">
        <div class="top"></div>    
        <div class="main">
            ME
        </div>
        <Footer :barNo="barNo"></Footer>
    </div>
</template>
<script>
import Footer from "../components/Footer"
export default {
    name:"ME",
    data(){
        return {
            barNo:4
        }
    },
    components:{
        Footer
    },
    created(){
    }
}
</script>
<style scoped>
.container .top{
    width: 100%;
    height: 5rem;
    background: greenyellow;
}
</style>

