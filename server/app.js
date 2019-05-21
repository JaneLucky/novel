//引入模块express
const express=require("express");
//引入跨域模块cors
const cors=require("cors");
//引入自定义的用户路由模块
const userRouter=require("./routes/user.js")
//引入自定义的用户路由模块
const productRouter=require("./routes/productList.js")
//引入自定义的图书详情模块
const bookRouter=require("./routes/books.js");
//引入自定义的上传文件的模块
const uploadRouter=require("./routes/upload");
//引入post请求的模块
const bodyParser=require("body-parser");
//引入session模块
const session=require("express-session");

//创建服务器
var app=express();
//设置监听端口号
app.listen(3000);

//挂载静态文件(图片、文件、等)
app.use(express.static("public"));


//配置post的模式的解析请求方式
app.use(bodyParser.urlencoded({extended: false}));


//设置允许跨域的地址
app.use(cors({
    //允许访问的url
    "origin" : "http://localhost:8080",
    // axios默认是不带钥匙的，这里设置axios必须携带钥匙
    credentials:true  //提高安全级别，每次访问都进行验证，是不是Vue脚手架的axios的请求
}));

//设置服务器端的session配置
app.use(session({
         secret:'Jane',//加密的字符串，里面内容可以随便写
        resave:true,  //每次请求是否更新session数据
         saveUninitialized:true //强制将未初始化的session存储，默认为true
}));



//挂载用户路由
app.use("/user",userRouter);

//挂载图书详情路由
app.use("/product",productRouter);

//挂载图书内容详情路由
app.use("/book",bookRouter);

//挂载上传文件的路由
app.use("/upload",uploadRouter);