// 引入第三方的express模块
const express=require("express");
// 引入自定义的数据库模块
const pool=require("../pool"); 
//引入模块fs
const fs=require("fs");
var readline = require('readline');
var join = require('path').join;
// 创建路由器
var router=express.Router();


//获得目录（文件夹）下的所有文件
function getJsonFiles(jsonPath){
    //所有文件的数组（非目录）
    let jsonFiles = [];
    //访问目录的函数
    function findJsonFile(path){
        //读取文件目录
        let files = fs.readdirSync(path);
        //将目录下的所有文件进行forEach，判断是否是文件还是目录
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            let stat = fs.statSync(fPath);
            //如果是目录，就再次调用findJsonFile(path)方法
            if(stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            //如果是文件，就将文件路径访问jsonFiles数组中
            if (stat.isFile() === true) { 
              jsonFiles.push(fPath.split("\\")[2].replace(".txt",""));
            }
        });
    }
    findJsonFile(jsonPath);
    return jsonFiles;
}
function readFileToArr(fReadName,callback){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        arr.push(line);
        //console.log('line:'+ line);
    });
    objReadline.on('close',function () {
       // console.log(arr);
        callback(arr);
    });
}

router.get("/details",function(req,res){
    var bid=req.query.bid;
    var session=1;
    pool.query("select path,bid from books where bid=?",[bid],function(err,result){
        if(err){
            throw err;
        }
        if(result.length>0){ 
            res.send({code:200,msg:getJsonFiles("public/"+result[0].path)});
        }
    });
})


//获得具体图书的所有详细信息
router.get("/summary",function(req,res){
    var bid=req.query.bid;
    pool.query("select title,description,author,size,pic,bid,status from books where bid=?",[bid],function(err,result){
        if(err){ throw err;}
        if(result.length>0){
            res.send({code:200,msg:result});
        }else{
            res.send({code:200,msg:"没有对应商品"});
        }

    })
})

//获得图书某个章节的内容
router.get("/article",function(req,res){
    var bid=req.query.bid;
    // console.log(bid);
    var sid=req.query.sid;
    pool.query("select path,title from books where bid=?",[bid],function(err,result){
        if(err){
            throw err;
        }
        if(result.length>0){ 
            var articleList=getJsonFiles("public/"+result[0].path)
            // res.send({code:200,msg:getJsonFiles("public/"+result[0].path)});
            var articleId=articleList[sid-1].toString();
            console.log(articleList);
            
            var paths="public/"+result[0].path+"/"+articleId+".txt";
            readFileToArr(paths,function(data){
                //     console.log(data);//返回值是buffer数据
                res.send({code:200,msg:data,title:articleId,len:articleList.length,groupTitle:result[0].title,titleList:articleList});
            });
        }
    });
});


router.get("/myBook",function(req,res){
    var queryList=req.query.queryList;
    var arr_string = queryList.join(','); // 用join把数组转化为1,2,3,4,5的字符串 
    var query=`select bid,title,pic from books where bid in (${arr_string}) order by field(bid,${arr_string})`;
    pool.query(query,function(err,result){
        if(err){ throw err; }
        if(result.length>0){
            // console.log(result);
            res.send({code:200,msg:result});
        }
    });
});


// 


//导出模块
module.exports=router;