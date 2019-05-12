const express=require("express");
const pool=require("../pool");
const multer=require("multer");//引入第三方模块multer
const fs=require("fs");

var router=express.Router();

// var upload = multer({dest:"upload/"});
// // 接收客户post请求
// router.post("/uploadFile",upload.single("mypic"),(req,res)=>{
// // 获取原文件名 
// var src = req.file.originalname;
// console.log(req.file)
// // 创建新文件名
// //var des = 时间戳+随机数+.jpg
// var ft = new Date().getTime(); //计算机毫秒数
// var tn = Math.floor(Math.random()*9999);
// var i3 = src.lastIndexOf("."); //查找后缀.的下标
// var suff = src.substring(i3); //i3位置开始截取
// var des = __dirname + "/upload/" + ft + tn + suff;
// console.log(des);
// // 将临时文件移动到upload目录下
// fs.renameSync(req.file.path,des);
// res.send({code:1,msg:"上传成功"})
// })
   

var upload=multer({dest:"upload/"});//创建对象，并指定临时文件目录
router.post("/uploadFile",upload.single("mypic"),(req,res)=>{
    // console.log(req.file);
    //原文件名
    var oldName=req.file.originalname;
    var lastI=oldName.lastIndexOf(".");
    var fileType=oldName.substring(lastI);
    var muDate=new Date().getTime();
    var randomData=Math.floor(Math.random()*9999)
    //新的文件名
    // var newName=++fileType;
    // console.log(newName);
    var dd= __dirname.substring(0,__dirname.lastIndexOf('\\')) ;
    // console.log(i);
    console.log(dd);
    var des=dd+"/upload/"+muDate+randomData+fileType;
    // console.log(__dirname);
    // console.log(dd.substring(0,i));
    //将临时文件移动到unload目录下
    fs.renameSync(req.file.path,des);
    // fs.renameSync(req.file.path,des);
    // req.file.mimetype  上传文件类型
    // if(req.file.mimetype != "image"){
    //     res.send({code:201,msg:"格式不正确"});
    // }
    res.send({code:200,msg:"成功"})
})

//导出模块
module.exports=router;