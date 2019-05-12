import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入axios模块，用于实现异步请求
import axios from 'axios'
//将axios对象放入Vue的原型对象中，之后所有模块都可以直接使用axios对象
Vue.prototype.axios=axios;
//异步请求时，带上安全验证。跨域访问保存session中的数据
axios.defaults.withCredentials=true
//引入md5加密模块
import md5 from "js-md5"
Vue.prototype.md5 = md5


//引入mui组件的样式文件mui.css//icons-extra.css
import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css"
// import "./lib/mui/js/mui.js"
import touch from "./common/touch"



//引入mint-ui组件库中的Header
import {Header,Button,Field,PaletteButton,Swipe,SwipeItem,Lazyload} from "mint-ui"
//全局配置/注册组件Header，Header.name="mt-header"，所有其他组件中都可以直接用<mt-header>
Vue.component(Header.name,Header);
Vue.component(Button.name,Button);
Vue.component(Field.name,Field);
Vue.component(PaletteButton.name,PaletteButton);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.use(Lazyload);


import'mint-ui/lib/style.css'

Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'



function vueTouch(el,binding,type){
  var _this=this;
  this.obj=el;
  this.binding=binding;
  this.touchType=type;
  this.vueTouches={x:0,y:0};
  this.vueMoves=true;
  this.vueLeave=true;
  this.longTouch=true;
  this.vueCallBack=typeof(binding.value)=="object"?binding.value.fn:binding.value;
  this.obj.addEventListener("touchstart",function(e){
      _this.start(e);
  },false);
  this.obj.addEventListener("touchend",function(e){
      _this.end(e);
  },false);
  this.obj.addEventListener("touchmove",function(e){
      _this.move(e);
  },false);
};
vueTouch.prototype={
start:function(e){
    this.vueMoves=true;
    this.vueLeave=true;
    this.longTouch=true;
    this.vueTouches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
    this.time=setTimeout(function(){
        if(this.vueLeave&&this.vueMoves){
            this.touchType=="longtap"&&this.vueCallBack(this.binding.value,e);
            this.longTouch=false;
        };
    }.bind(this),1000);
},
end:function(e){
    var disX=e.changedTouches[0].pageX-this.vueTouches.x;
    var disY=e.changedTouches[0].pageY-this.vueTouches.y;
    clearTimeout(this.time);
    if(Math.abs(disX)>10||Math.abs(disY)>100){
        this.touchType=="swipe"&&this.vueCallBack(this.binding.value,e);
        if(Math.abs(disX)>Math.abs(disY)){
            if(disX>10){
                this.touchType=="swiperight"&&this.vueCallBack(this.binding.value,e);
            };
            if(disX<-10){
                this.touchType=="swipeleft"&&this.vueCallBack(this.binding.value,e);
            };
        }else{
            if(disY>10){
                this.touchType=="swipedown"&&this.vueCallBack(this.binding.value,e);
            };
            if(disY<-10){
                this.touchType=="swipeup"&&this.vueCallBack(this.binding.value,e);
            };  
        };
    }else{
        if(this.longTouch&&this.vueMoves){
            this.touchType=="tap"&&this.vueCallBack(this.binding.value,e);
            this.vueLeave=false
        };
    };
},
move:function(e){
    this.vueMoves=false;
}
};
Vue.directive("tap",{
bind:function(el,binding){
    new vueTouch(el,binding,"tap");
}
});
Vue.directive("swipe",{
bind:function(el,binding){
    new vueTouch(el,binding,"swipe");
}
});
Vue.directive("swipeleft",{
bind:function(el,binding){
    new vueTouch(el,binding,"swipeleft");
}
});
Vue.directive("swiperight",{
bind:function(el,binding){
    new vueTouch(el,binding,"swiperight");
}
});
Vue.directive("swipedown",{
bind:function(el,binding){
    new vueTouch(el,binding,"swipedown");
}
});
Vue.directive("swipeup",{
bind:function(el,binding){
    new vueTouch(el,binding,"swipeup");
}
});
Vue.directive("longtap",{
bind:function(el,binding){
    new vueTouch(el,binding,"longtap");
}
});
// 检测变量是否存在于localStorage中
Vue.prototype.checkStorage = function (bid){
  var list=JSON.parse(localStorage.getItem("list"));
  var flag=0;
  if(list==null){//说明localStorage中没有书
    return false;
  }else{//说明localStorage中有书
    for(var i=0; i<list.length;i++){
      if(list[i].bid==bid){
        break;
      }else{
        flag++;
      }
    }
    if(flag==list.length){//说明localStorage中没有指定bid的书
      return false;
    }else{//说明localStorage中有指定bid的书
      return true;
    }
  }
}
//向localStorage中添加对象
Vue.prototype.addToStorage = function (bid){
  // localStorage.clear();
  var bookMark={bid:parseInt(bid),sid:1,scrTop:0};//要存储的json对象
  var list=JSON.parse(localStorage.getItem("list"));
  if(list==null){
    list=[];
    list[0]=bookMark;
  }else{
    list.push(bookMark);
  }
  localStorage.setItem("list",JSON.stringify(list));//将json对象转化成字符串，存入localStorage中
}
// 获得localStorage中的指定对象
Vue.prototype.getLocalStorage = function (bid){
  var list =JSON.parse(localStorage.getItem("list"));
  var obj={};
  for(var i=0;i<list.length;i++){
    if(list[i].bid==bid){
      obj=list[i];
      break;
    }
  }
  return obj;
}
// 修改localStorage中的指定对象
Vue.prototype.setLocalStorage = function (bid,sid,scrTop){
  var list = [];
  list =JSON.parse(localStorage.getItem("list"));
  var obj={bid:bid,sid:sid,scrTop:scrTop};
  for(var i=0;i<list.length;i++){
    if(list[i].bid==bid){
      list.splice(i, 1);
      break;
    }
  }
  list.push(obj);
  localStorage.setItem("list",JSON.stringify(list));
}


//全局自定义组件，使用： <input type="text" v-focus/>
Vue.directive("focus", {
  inserted(elem){
    elem.focus();
  }
});
Vue.directive("blur", {
  inserted(elem){
    elem.blur();
  }
});
//全局过滤器，时间格式化 yyyy-mm-dd hh:mm:ss
Vue.filter("dateFormat",function(value){
  var dt=new Date(value);
  
  return `${dt.getFullYear()}-${(dt.getMonth()+1).toString().padStart(2,"0")}-${dt.getDate().toString().padStart(2,"0")} ${dt.getHours().toString().padStart(2,"0")}:${dt.getMinutes().toString().padStart(2,"0")}:${dt.getSeconds().toString().padStart(2,"0")}`;

});

























new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
