<template>
    <div>
        <mt-header fixed title="书城" style="background:#fff;color:#333;font-size:1rem; border-bottom:1px solid #e6e6e6;">
            <router-link to="/" slot="left">
                <mt-button @click="goBack">
                    <img src="http://127.0.0.1:3000/back.png" alt="" style="height:50%; vertical-align: middle;">
                </mt-button>
            </router-link>
            <mt-button slot="right" @click="goHome">
                <img src="http://127.0.0.1:3000/home.png" alt="" style="height:60%; vertical-align: middle;">
            </mt-button>
        </mt-header>
    </div>
</template>
<script>
export default {
    name:"Header",
    methods:{
        goHome(){
            this.$router.push("/");
        },
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>