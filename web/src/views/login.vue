<template>
    <div class="container">
        <Header></Header>
        <div class="toLogin" v-show="!iflogin">
            <div class="title">
    
                <p :class="`${account==true?'active':''}`" @click="toggle">账号登录</p>
                <p :class="`${account==false?'active':''}`" @click="toggle">手机验证码</p>
            </div>
            <div class="main" v-show="account">
                <div class="myForm">
                    <div>
                        <label for="uname">账号</label>
                        <input id="uname" name="uname" type="text" placeholder="请输入用户名" v-model="username">
                    </div>
                    <div>
                        <label for="upwd">密码</label>
                        <input id="upwd" name="upwd" type="password" placeholder="请输入密码" v-model="password">
                    </div>
                    <div id="remember">
                        <img :src="checkImgPwd" alt="" @click="rememberPwd">&nbsp;&nbsp;&nbsp;&nbsp;<label for="remember">记住密码</label>
                    </div>
                </div>
            </div>
            <div class="main" v-show="!account">
                <div class="myForm">
                    <div>
                        <label for="phone">手机号</label>
                        <input id="phone" name="phone" type="text" placeholder="请输入手机号" v-model="phone">
                    </div>
                    <div>
                        <label for="checkNo1">校验码</label>
                        <input id="checkNo1" name="checkNo1" type="text" v-model="pwd">
                    </div>
                    <div>
                        <label for="checkNo2">验证码</label>
                        <input id="checkNo2" name="checkNo2" type="text" v-model="valiNum">
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
                        <input id="submit" type="submit" value="登录" @click="submit" :class="ifAgree?'canSubmit':'canNotSubmit'">
                    </div>
                </div>
            </div>
            <div class="otherLink clearFlexd">
                <div class="left">忘记密码？</div>
                <div class="right"><router-link to="/register">注册</router-link></div>
            </div>
        </div>
        <div class="logined" v-show="iflogin">
            <div>
                 <div style="padding:3rem 0 1rem;">
                     <img src="../assets/me.png" alt="" style="display:block;margin:0 auto;width:30%;">
                 </div>
                <p style="text-align:center;font-size:1.4rem; font-weight:600;">
                    欢迎<span style="color:#4cb3b2">{{username}}</span>登录
                </p>
                <button @click="loginOut" class="loginOut">退出登录</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import Header from "../components/Header"

export default {
    name:"Login",
    data(){
        return {
            iflogin:false,
            username:"",
            password:"",
            phone:"",
            pwd:"",
            valiNum:"",
            account:true,
            ifAgree:false,
            checkImg:"http://127.0.0.1:3000/checkBtn.png",
            checkImgPwd:"http://127.0.0.1:3000/checkBtn.png",
            isrememberPwd:false
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
            // console.log(this.md5(this.password));
            if(this.ifAgree){
                this.axios.get("http://127.0.0.1:3000/user/login",{
                    params:{
                        uname:this.username,
                        upwd:this.md5(this.password)
                    }
                }).then((result)=>{
                    console.log(result.data);
                    if(result.data.code==200){
                        if(this.isrememberPwd){
                            this.setCookies("uname",this.username,7*60*60*24);
                            this.setCookies("upwd",this.password,7*60*60*24);
                            this.setCookies("isrememberPwd",this.isrememberPwd,7*60*60*24);
                        }else{
                            this.setCookies("uname",'',-1);
                            this.setCookies("upwd",'',-1);
                            this.setCookies("isrememberPwd",'',-1);
                        }
                        this.iflogin=true;
                        sessionStorage.setItem("islogin",this.iflogin);
                        sessionStorage.setItem("username",this.username);
                        this.$router.push("/");
                    }else{
                        Toast("用户名或者密码错误");
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
        loginOut(){
            this.axios.get("http://127.0.0.1:3000/user/loginOut").then((result)=>{
                this.iflogin=false;
                sessionStorage.setItem("islogin",this.iflogin);
                this.$router.go(0);
            })
        },
        rememberPwd(){
            if(this.isrememberPwd==false){
                this.isrememberPwd=true;
                this.checkImgPwd="http://127.0.0.1:3000/checkBtn_active.png";
            }else{
                this.isrememberPwd=false;
                this.checkImgPwd="http://127.0.0.1:3000/checkBtn.png";
            }
        }

    },
    components:{
        Header
    },
    created(){
        if(sessionStorage.getItem("islogin")=='false'){
            this.iflogin=false;
        }else{
            this.iflogin=true;
        }
        this.username=sessionStorage.getItem("uname");
        this.upwd=sessionStorage.getItem("upwd");
        if(!this.iflogin){
            var obj=this.getCookies();
            if(obj.uname!=undefined){
                this.username=obj.uname;
            }
            if(obj.upwd!=undefined){
                this.password=obj.upwd;
            }
            if(obj.isrememberPwd!=undefined){
                this.isrememberPwd=obj.isrememberPwd;
                if(this.isrememberPwd){
                    this.checkImgPwd="http://127.0.0.1:3000/checkBtn_active.png";
                }else{
                    this.checkImgPwd="http://127.0.0.1:3000/checkBtn.png";
                }
            }
        }

    }

    
}
</script>
<style scoped>
#remember{
    border: none;
}
#remember img{
    width: 5%;
    margin: 0 auto;
    vertical-align: middle;
}
#remember label{
    font-size: 0.8rem;
}
.loginOut{
    text-align: center;
    display: block;
    margin: 0 auto;
    border: solid 1px #4cb3b2;
    color: #4cb3b2;
    margin-top: 1rem;
    box-shadow: 0.1rem 0.1rem 1rem #aaa;
}
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
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #e6e6e6;
    margin: 0;
    box-sizing: border-box;
}
.title p{
    width: 50%;
    text-align: center;
    margin: 0;
    padding: 1.4rem 0 0.6rem 0;
    font-size: 1rem;
}
.title .active{
    border-bottom: 1px solid #4cb3b2;
    color: #4cb3b2;
}
.myForm {
    margin-top: 2rem;
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
