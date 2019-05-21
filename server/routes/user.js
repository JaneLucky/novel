//引入express模块
const express=require("express");
//引入自定义的数据库连接池模块
const pool=require("../pool.js")
//引入md5-node加密解密模块模块
var md5 = require('md5-node'); 
//创建路由器
var router=express.Router();

//用户登录
router.get("/login",function(req,res){
    // console.log(req)
    var uname=req.query.uname;
    var upwd=req.query.upwd;
    // console.log(uname,upwd);
    // console.log(md5(upwd));
    pool.query("select uid from vue_user where uname=? and upwd=?",[uname,upwd],function(err,result){
        if(err){ throw err}
        if(result.length==0){
            res.send({code:201,msg:"用户名或者密码错误"});
        }else{
            req.session.uid=result[0].uid;
            console.log(req.session.uid);
            res.send({code:200,msg:result});
        }

    })

});
//用户注册
router.post("/register",function(req,res){
    var phone=req.body.phone;
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    console.log(uname);
    pool.query("select phone from vue_user where phone=?",[phone],function(err,result){
        if(err){
            throw err;
        }
        if(result.length>0){
            res.send({code:201,msg:"已经注册过了"});
        }else{
            pool.query("select uname from vue_user where uname=?",[uname],function(err,result){
                if(err){
                    throw err;
                }
                if(result.length>0){
                    res.send({code:202,msg:"该用户名已经被占用"});
                }else{
                    pool.query("insert into vue_user values (null,?,?,?,null,null,null,null)",[uname,upwd,phone],function(err,result){
                        if(err){
                            throw err;
                        }
                        if(result.affectedRows>0){
                            res.send({code:200,msg:"注册成功"});
                        }

                    })
                }
            })
        }
    })
});
//判断用户是否已经登录
router.get("/checkLogin",function(req,res){
    var uid=req.session.uid;
    console.log(uid);
    pool.query("select uid from vue_user where uid=?",[uid],function(err,result){
        if(err){ throw err}
        if(result.length==0){
            res.send({code:201,msg:"请先去登录"});
        }else{
            res.send({code:200,msg:"已经登录了"});
        }

    })

});
//退出登录
router.get("/loginOut",function(req,res){
    req.session.destroy();
    res.send({code:200,msg:"销毁session"});
})


module.exports=router;