<template>
    <div>
        <button @click="langGo">浪起来</button>
        <button @click="langStop">低调</button>
        <h3>{{msg}}</h3>
    </div>
</template>
<script>
export default {
    name:"lightGo",
    data(){
        return {
            msg:"猥琐发育，别浪~~~！",
            interval:null
        }
    },
    methods:{
        langGo(){
            if(this.interval != null) return ;
            this.interval=setInterval(()=>{
                 this.msg=this.msg.substring(1)+this.msg.substring(0,1);
            },500)
        },
        langStop(){
            clearInterval(this.interval);
            this.interval=null;

        }
    }
}
</script>
