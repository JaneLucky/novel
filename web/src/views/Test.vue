<template>
    <div>
        <Carousel1></Carousel1>
        <CarouselTxt></CarouselTxt>
        <!-- <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <img src="../img/menu1.png" alt="">
                        <div class="mui-media-body">Phone</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <img src="../img/menu2.png" alt="">
                        <div class="mui-media-body">Phone</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <img src="../img/menu3.png" alt="">
                        <div class="mui-media-body">Phone</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <img src="../img/menu4.png" alt="">
                        <div class="mui-media-body">Phone</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <img src="../img/menu5.png" alt="">
                        <div class="mui-media-body">Phone</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <img src="../img/menu6.png" alt="">
                        <div class="mui-media-body">Phone</div>
                    </a>
                </li>
            </ul> 
		</div> -->
        <Grid></Grid>
    </div>

</template>
<script>
import Carousel1 from "../components/Carousel1"
import Grid from "../components/Grid"
import CarouselTxt from "../components/Carousel_txt"
export default {
    name:"Test",
    data(){
        return {}
    },
    components:{
        Carousel1,
        Grid,
        CarouselTxt
    }
    
}
</script>
<style scoped>
    ul>li{
        background: #fff;
    }
    .mui-content,.mui-content>ul,.mui-content>ul>li{
        background: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right: none;
        border-bottom: none;
    }
    .mui-content img{
        width: 65%;
        /* width: 60px;
        height: 60px; */
        background: #fff;
    }
</style>

