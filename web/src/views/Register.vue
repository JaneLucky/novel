<template>
    <div class="container">
        <Header></Header>
        <div class="title">
            <p>注册</p>
        </div>
        <div class="main" v-show="account">
            <div class="myForm">
                <div>
                    <label for="uname">用户名</label>
                    <input id="uname" name="uname" type="text" placeholder="请输入用户名" v-model="username">
                </div>
                <div>
                    <label for="phone">手机号</label>
                    <input id="phone" name="phone" type="number" placeholder="请输入手机号" v-model="phone">
                </div>
                <div>
                    <label for="upwd">密&nbsp;&nbsp;&nbsp;码</label>
                    <input id="upwd" name="upwd" type="password" placeholder="请输入密码" v-model="password">
                </div>
            </div>
        </div>
        <div class="main">
            <div class="myForm">
                <div id="serve">
                    <div>
                        <img :src="checkImg" alt="" @click="agreeServe">&nbsp;&nbsp;&nbsp;&nbsp;同意<span>《用户服务协议》</span>和<span>《隐私服务协议》</span>
                    </div>
                </div>
                <div>
                    <input id="submit" type="submit" value="注册" @click="submit" :class="ifAgree?'canSubmit':'canNotSubmit'">
                </div>
            </div>
        </div>
        <div class="otherLink clearFlexd">
            <div class="left">忘记密码？</div>
            <div class="right"><router-link to="/login">登录</router-link></div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import Header from "../components/Header"

export default {
    name:"Register",
    data(){
        return {
            username:"",
            password:"",
            phone:"",
            status1:"",
            status2:"",
            account:true,
            ifAgree:false,
            checkImg:"http://127.0.0.1:3000/checkBtn.png"
        }
    },
    methods:{
        agreeServe(){
            if(this.ifAgree==false){
                this.ifAgree=true;
                this.checkImg="http://127.0.0.1:3000/checkBtn_active.png";
            }else{
                this.ifAgree=false;
                this.checkImg="http://127.0.0.1:3000/checkBtn.png";
            }
        },
        //设置cookie
        setCookies(name,value,expiredays){
            document.cookie=name+"="+value+";max-age="+expiredays;
            console.log(document.cookie);
        },
        //获得cookie
        getCookies(){
            var arr1=document.cookie.split(";");
            var obj={};
            for(var i=0;i<arr1.length;i++){
                var arr2=arr1[i].trim().split("=");
                obj[arr2[0]]=arr2[1];
            }
            return obj;
        },
        submit(){
            var regexp=/^\w{3,8}$/;
            if(!regexp.test(this.username)){
                Toast("用户名格式为3-8位的字母，数字或者下划线");
                return;
            }
            var regexp1=/^\d{3,8}$/;
            if(!regexp1.test(this.password)){
                Toast("密码格式为3-8位的数字");
                return;
            }
            var regexp2=/^[1][3,4,5,7,8]\d{9}$/;
            if(!regexp2.test(this.phone)){
                Toast("手机格式为11位的数字");
                return;
            }
            // console.log(this.md5(this.password));
            // ?uname=${this.username}&upwd=${this.md5(this.password)}&phone=${this.phone}
            var query=`uname=${this.username}&upwd=${this.md5(this.password)}&phone=${this.phone}`;
            if(this.ifAgree){
                console.log(this.phone);
                this.axios.post("http://127.0.0.1:3000/user/register",query).then((result)=>{
                    console.log(result.data);
                    if(result.data.code==200){
                        // Toast("");
                        this.setCookies("uname",this.username,7*60*60*24);
                        this.setCookies("upwd",'',-1);
                        this.setCookies("isrememberPwd",'',-1);
                        Toast({
                            message: '注册成功',
                            duration: 1000
                        });
                        setTimeout(()=>{
                            this.$router.push("/login");
                        },1000);
                    }else if(result.data.code==202){
                        Toast("该用户名已经被占用");
                    }else{
                        Toast("已经注册过了");
                    }
                })
            }else{
                Toast("请同意协议");
            }
        },
        toggle(){
            if(this.account==false){
                this.account=true;
                this.ifAgree=false;
                this.checkImg="http://127.0.0.1:3000/checkBtn.png";
            }else{
                this.account=false;
                this.ifAgree=false;
                this.checkImg="http://127.0.0.1:3000/checkBtn.png";
            }
        }
    },
    created(){
    },
    components:{
        Header
    }
    
}
</script>
<style scoped>
.otherLink{
    width:80%;
    margin: 0 auto;
    padding-top: 0.6rem;
    font-size: 0.8rem;
}
.otherLink .left{
    float: left;
    color: DimGray;
}
.otherLink .right{
    float: right;
}
.otherLink .right a{
    color: #4cb3b2;
}
.title{
    margin: 0;
}
.title p{
    text-align: left;
    padding: 2rem;
    margin: 0 auto;
    font-size: 1.2rem;
    color: #4cb3b2;
}
.myForm div{
    width:80%;
    margin:0 auto;
    border-bottom: 1px solid #e6e6e6;
    padding: 1rem 0 0 0;
    box-sizing: border-box;
}
.myForm div input::-ms-input-placeholder{
    text-align: left; 
    color:Silver;
    font-weight: normal;
}
.myForm div input::-webkit-input-placeholder{
    text-align: left; 
    color:Silver;
    font-weight: normal;
}
.myForm div input::-moz-placeholder{
    text-align: left; 
    color:Silver;
    font-weight: normal;
}
.myForm div label{
    margin: 0;
    padding: 0;
    display:inline-block;padding-right:1rem;font-size:1rem;
}
.myForm div input{
    margin: 0;
    padding: 0;
    width:75%;
    border:none;  
}
#submit{
    width:100%;
    border:none;
    font-size:1.2rem;
    padding: 0.5rem;
}
#submit.canSubmit{
    background: #4cb3b2;
    color: #fff
}
#submit.canNotSubmit{
    background: 	Silver;
    color: DimGray;
}
#serve{
    width:80%;
    text-align: left;
    padding: 0;
    border: none;
    margin-top:0;
    height: 2rem;
}
#serve div{
    width: 100%;
    padding: 0;
    margin: 0;
    border: none;
    font-size: 0.8rem;
    text-align: center;
    margin-top: 2rem;
    line-height: 2rem;
}
#serve div img{
    width: 5%;
    margin: 0 auto;
    vertical-align: middle;
}
#serve div span{
    color: #4cb3b2;
}
.clearFlexd::after{
    content: "";
    display: block;
    clear: both;
}
</style>
