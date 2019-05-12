import Vue from 'vue'
import Router from 'vue-router'
import Exam01 from "./views/Exam01.vue"
import List from "./views/List"
import Login from "./views/login"
import Register from "./views/Register"
import LightGo from "./views/跑马灯"
import Index from "./views/Index"
import FemaleList from "./views/FemaleList"
import MaleList from "./views/MaleList"
import Carousel1 from "./views/Test"
import Classify from "./views/Classify"
import Category from "./views/Category"
import RankList from "./views/RankList"
import RankCategory from "./views/RankCategory"
import OverList from "./views/OverList"
import MyBook from "./views/MyBook"
import FreeBook from "./views/FreeBook"
import ME from "./views/ME"
import DetailList from "./views/DetailList"
import ContentList from "./views/ContentList"
import Article from "./views/Article"
import UploadFile from "./views/UploadFile"



Vue.use(Router);

export default new Router({
  routes: [
    // {path:'/',component:HelloContainer},
    {path:"/exam01",component:Exam01},
    {path:"/list",component:List},
    {path:"/login",component:Login},
    {path:"/lightgo",component:LightGo},
    {path:"/",component:Index},
    {path:"/index",component:Index},
    {path:"/carousel1",component:Carousel1},
    {path:"/femaleList",component:FemaleList},
    {path:"/maleList",component:MaleList},
    {path:"/classify",component:Classify},
    {path:"/category",component:Category},
    {path:"/rankList",component:RankList},
    {path:"/rankCategory",component:RankCategory},
    {path:"/overList",component:OverList},
    {path:"/myBook",component:MyBook},
    {path:"/freeBook",component:FreeBook},
    {path:"/me",component:ME},
    {path:"/detailList",component:DetailList},
    {path:"/contentList",component:ContentList},
    {path:"/article",component:Article},
    {path:"/register",component:Register},
    {path:"/uploadFile",component:UploadFile}

  ]
})
