<template>
    <div class="container">
        <nav class="mui-bar mui-bar-tab">
			<router-link to="/myBook" :class="barNo==1?'mui-tab-item active':'mui-tab-item '" @click="changeBarNo(1)">
				<span class="mui-icon back" style=""></span>
				<span class="mui-tab-label">书架</span>
			</router-link>
			<router-link to="/freeBook" :class="barNo==2?'mui-tab-item active':'mui-tab-item '" @click="changeBarNo(2)">
				<span class="mui-icon">
                    </span>
				<span class="mui-tab-label">免费</span>
			</router-link>
			<router-link to="/index" :class="barNo==3?'mui-tab-item active':'mui-tab-item '" @click="changeBarNo(3)">
				<span class="mui-icon"></span>
				<span class="mui-tab-label">书城</span>
			</router-link>
			<router-link to="/login" :class="barNo==4?'mui-tab-item active':'mui-tab-item '" @click="changeBarNo(4)">
				<span class="mui-icon"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
    </div>
</template>
<script>
export default {
    name:"Footer",
    props:["barNo"],
    data(){
        return {
            
        }
    },
    methods:{
        //切换底部的按钮
        changeBarNo(no){
            this.barNo=no;
        },
    },
    created(){
    }
}
</script>
<style scoped>
.active>.mui-tab-label{
    color: #4cb3b2;
}
.mui-bar>a:nth-child(1).active>span.mui-icon{
    background:url(http://127.0.0.1:3000/book_select.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
.mui-bar>a:nth-child(2).active>span.mui-icon{
    background:url(http://127.0.0.1:3000/free_select.jpg) no-repeat;
    background-size:1.5rem 2rem;
    background-position:center -0.2rem;
}
.mui-bar>a:nth-child(3).active>span.mui-icon{
    background:url(http://127.0.0.1:3000/city_select.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
.mui-bar>a:nth-child(4).active>span.mui-icon{
    background:url(http://127.0.0.1:3000/me_select.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
.mui-bar>a:nth-child(1)>span.mui-icon{
    background:url(http://127.0.0.1:3000/book.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
.mui-bar>a:nth-child(2)>span.mui-icon{
    background:url(http://127.0.0.1:3000/free.jpg) no-repeat;
    background-size:1.5rem 2rem;
    background-position:center -0.2rem;
}
.mui-bar>a:nth-child(3)>span.mui-icon{
    background:url(http://127.0.0.1:3000/city.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}
.mui-bar>a:nth-child(4)>span.mui-icon{
    background:url(http://127.0.0.1:3000/me.jpg) no-repeat;
    background-size:1.5rem;
    background-position:center bottom;
}

</style>
