<template>
    <div>
        <div class="carousel">            
            <ul v-bind:style="carousel_style" class="clearFixed">
                <li>
                    <img src="http://127.0.0.1:3000/carousel4.jpg" alt="">
                </li>
                <li>
                    <img src="http://127.0.0.1:3000/carousel1.jpg" alt="">
                </li>
                <li>
                    <img src="http://127.0.0.1:3000/carousel2.jpg" alt="">
                </li>
                <li>
                    <img src="http://127.0.0.1:3000/carousel3.jpg" alt="">
                </li>
                <li>
                    <img src="http://127.0.0.1:3000/carousel4.jpg" alt="">
                </li>
            </ul>
            <div class="flag clearFixed">
                <span v-bind:style="{'background-color':i==1 ? 'lightgrey':'gray'}"></span>
                <span v-bind:style="{'background-color':i==2 ? 'lightgrey':'gray'}"></span>
                <span v-bind:style="{'background-color':i==3 ? 'lightgrey':'gray'}"></span>
                <span v-bind:style="{'background-color':i==4||i==0 ? 'lightgrey':'gray'}"></span>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name:"Carousel1",
    data(){
        return {
            i:1,
            carousel_style:{
                marginLeft : "-100%",
                transition: "1s"
                
            },
            interval:null,

        }
    },
    methods:{
        carouselAuto(liSize){//liSize是指轮播图片的张数
            this.interval=setInterval(()=>{
                if(this.i < liSize-1){
                    this.i++;
                    this.carousel_style.marginLeft=(this.i*-100)+"%";
                }else{
                    this.i++;
                    this.carousel_style.marginLeft=(this.i*-100)+"%";
                    setTimeout(()=>{
                        this.i=0;
                        this.carousel_style.marginLeft="0%";
                        this.carousel_style.transition="0s";
                    },1000);

                }
                this.carousel_style.transition="1s";
            },3000);
        }

    },
    mounted(){
        this.carouselAuto(4);
    }
}
</script>
<style scoped>
    .carousel{
        width: 100%;
        position: relative;
    }
    .carousel .flag{
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        
    }
    .carousel .flag span{
        width: 0.6rem;
        height: 0.6rem;
        background: gray;
        /* background: lightgrey; */
        float: left;
        border-radius: 50%;
    }
    .carousel .flag span+span{
        margin-left: 0.5rem;
    }
    ul{
        margin: 0 auto;
        padding: 0;
        width: 500%;
        }
    ul>li{
        list-style: none;
        margin: 0 auto;
        padding: 0;
        width: 20%;
        float: left;
        }
    ul>li>img{
        display: block;
        width: 100%;
        }
    .clearFixed::after{
        content: "";
        display: block;
        clear: both;
        }
</style>
