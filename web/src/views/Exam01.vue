<template>
    <div>
        <mt-header fixed title="long long long long long long long long title">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>

        <h3>按钮颜色</h3>
        <mt-button type="default">default</mt-button>
        <mt-button type="primary">primary</mt-button>
        <mt-button type="danger">danger</mt-button>
        <h3>按钮大小</h3>
        <mt-button size="small">small</mt-button>
        <mt-button size="large">large</mt-button>
        <mt-button size="normal">normal</mt-button>
        <h3>禁用</h3>
        <mt-button disabled>disabled</mt-button>
        <h3>幽灵按钮</h3>
        <mt-button plain>plain</mt-button>

        <mt-button>
        <img src="../img/menu1.png" height="20" width="20" slot="icon">
        带自定义图标
        </mt-button>
    </div>
</template>
<script>
// import mtHeader from ""
export default {
    name:"tplExam01",
    data(){
        return {}
    },
    components: {
        // mtHeader
    }
}
</script>
<style scoped>
    h1{
        background: grey;
    }
</style>
