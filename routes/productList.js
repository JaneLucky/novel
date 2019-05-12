const express=require("express");
const pool = require("../pool");
var router = express.Router();


router.get("/list",function(req,res){
    var gender_id=req.query.gender_id;
    var output={
        pno:0,
        pCount:0,
        pSize:8,
        proList:[]
    };
    output.pno=parseInt(req.query.pno);
    pool.query("select title,author,pic,href,bid from books where gender_id=?",[gender_id],function(err,result){
        if(err){ throw err }
        if(result.length>0){
            output.pCount=Math.ceil(parseInt(result.length)/parseInt(output.pSize));
            pool.query("select title,author,pic,href,bid from books where gender_id=? limit ?,?",[gender_id,(output.pno)*output.pSize,output.pSize],function(err,result){
                if(err){ throw err }
                if(result.length>0){
                    output.proList=result,
                    output.pno=output.pno+1,
                    res.send(output);
                }
            })
        }
    })

})
router.get("/recommend",function(req,res){
    var pnoRe=req.query.pnoRe;
    pool.query("select title,author,pic,href,bid from books order by title limit ?,?",[pnoRe*8,8],function(err,result){
        pnoRe++;
        if(err){
            throw err;
        }
        if(result.length>0){
            var msg=result;
            pool.query("select bid from books",function(err,result){
                if(err){ throw err; }
                if(result.length>0){
                    res.send({code:200,msg:msg,pnoRe:pnoRe,allnoRe:Math.ceil(result.length/8)});
                }
            })
        }
    });
})
router.get("/recommendNew",function(req,res){
    var pnoReNew=req.query.pnoReNew;
    pool.query("select title,author,pic,href,bid from books where status='连载' order by description limit ?,?",[pnoReNew*8,8],function(err,result){
        pnoReNew++;
        if(err){
            throw err;
        }
        if(result.length>0){
            var msg=result;
            pool.query("select bid from books where status='连载'",function(err,result){
                if(err){ throw err; }
                if(result.length>0){
                    res.send({code:200,msg:msg,pnoReNew:pnoReNew,allnoReNew:Math.ceil(result.length/8)});
                }
            })
        }
    });
})
router.get("/recommendFemale",function(req,res){
    var pnoReFemale=req.query.pnoReFemale;
    pool.query("select title,author,pic,href,bid from books where gender_id=1 order by description limit ?,?",[pnoReFemale*8,8],function(err,result){
        pnoReFemale++;
        if(err){
            throw err;
        }
        if(result.length>0){
            var msg=result;
            pool.query("select bid from books where gender_id=1",function(err,result){
                if(err){ throw err; }
                if(result.length>0){
                    res.send({code:200,msg:msg,pnoReFemale:pnoReFemale,allnoReFemale:Math.ceil(result.length/8)});
                }
            })
        }
    });
})
router.get("/recommendMale",function(req,res){
    var pnoReMale=req.query.pnoReMale;
    pool.query("select title,author,pic,href,bid from books where gender_id=2 order by description limit ?,?",[pnoReMale*8,8],function(err,result){
        pnoReMale++;
        if(err){
            throw err;
        }
        if(result.length>0){
            var msg=result;
            pool.query("select bid from books where gender_id=2",function(err,result){
                if(err){ throw err; }
                if(result.length>0){
                    res.send({code:200,msg:msg,pnoReMale:pnoReMale,allnoReMale:Math.ceil(result.length/8)});
                }
            })
        }
    });
})
router.get("/quality",function(req,res){
    var pnoQuality=req.query.pnoQuality;
    var gender_id=req.query.gender_id;
    pool.query("select title,author,pic,href,description,size,bid from books where gender_id=? order by size limit ?,?",[gender_id,pnoQuality*5,5],function(err,result){
        pnoQuality++;
        if(err){
            throw err;
        }
        if(result.length>0){
            var msg=result;
            pool.query("select bid from books where gender_id=?",[gender_id],function(err,result){
                if(err){ throw err; }
                if(result.length>0){
                    res.send({code:200,msg:msg,pnoQuality:pnoQuality,allnoQuality:Math.floor(result.length/5)});
                }
            })
        }
    });
})
router.get("/sayGood",function(req,res){
    var gender_id=req.query.gender_id;
    pool.query("select title,pic,href,description,size,bid from books where gender_id=? group by size desc limit 5",[gender_id],function(err,result){
        if(err){
            throw err;
        }
        if(result.length>0){
            res.send({code:200,msg:result});
        }
    })
})

//获得所有图书的类别
router.get("/classifyList",function(req,res){
    pool.query("select fid,fname,fpic,keywords from book_family",function(err,result){
        if(err){
            throw err;
        }
        if(result.length>0){
            res.send({code:200,msg:result});
        }
    })
})


//获得项目类中的图书列表
router.get("/bookItem",function(req,res){
    var fid=req.query.fid;
    pool.query("select pic,title,author,description,status,size,bid from books where fid=?",[fid],function(err,result){
        if(err){
            throw err;
        }
        if(result.length>0){
            res.send({code:200,msg:result});
        }
    });
})

//获得图书排行榜分类数据
router.get("/rankItems",function(req,res){
    var status=req.query.status;
    var gender_id=req.query.gender_id;
    if(status==1){
        status="完结";
    }else if(status==2){
        status="连载";
    }else if(status==3){
        status=undefined;
    }
    if(gender_id==3){
        gender_id=undefined;
    }
    if(status==undefined && gender_id==undefined){//综合排行--所有
        pool.query("select pic,title,author,description,status,size,bid from books order by size",function(err,result){
            if(err){throw err}
            if(result.length>0){
                res.send({code:200,msg:result});
            }else{
                res.send({code:200,msg:"没有对应商品"});
            }
        })
    }
    if(status!=undefined && gender_id==undefined){//综合排行--新书/完结
        pool.query("select pic,title,author,description,status,size,bid from books where status=? order by size",[status],function(err,result){
            if(err){throw err}
            if(result.length>0){
                res.send({code:200,msg:result});
            }else{
                res.send({code:200,msg:"没有对应商品"});
            }
        })
    }
    if(status==undefined && gender_id!=undefined){//男/女生综合排行--所有
        pool.query("select pic,title,author,description,status,size,bid from books where gender_id=? order by size",[gender_id],function(err,result){
            if(err){throw err}
            if(result.length>0){
                res.send({code:200,msg:result});
            }else{
                res.send({code:200,msg:"没有对应商品"});
            }
        })
    }
    if(status!=undefined && gender_id!=undefined){//男/女生综合排行--所有
        pool.query("select pic,title,author,description,status,size,bid from books where status=? and gender_id=? order by size",[status,gender_id],function(err,result){
            if(err){throw err}
            if(result.length>0){
                res.send({code:200,msg:result});
            }else{
                res.send({code:200,msg:"没有对应商品"});
            }
        })
    }
});


//获得图书排行榜总类数据
router.get("/rankList",function(req,res){
    var rank_id=req.query.rank_id;
    pool.query("select pic,rank_title,status,gender_id from book_rank where rank_id=?",[rank_id],function(err,result){
        if(err){
            throw err;
        }
        if(result.length>0){
            res.send({code:200,msg:result});
        }else{
            res.send({code:201,msg:"目前没有该品类的书籍"});
        }
    })
})

//获得完结版的小说列表
router.get("/overList",function(req,res){
    pool.query("select title,description,author,size,pic,href,bid from books where status='完结'",function(err,result){
        if(err){
            throw err
        }
        if(result.length>0){
            res.send({code:200,msg:result});
        }else{
            res.send({code:201,msg:"目前没有对应的图书"});
        }
    })
})

//关键字查询
router.get("/search",function(req,res){
    var keyword=req.query.keyword;
    var pno=parseInt(req.query.pno);
    var psize=parseInt(req.query.psize);
    if(!pno){
        pno=1;
    }
    if(!psize){
        psize=8;
    }
    pool.query("select title,author,pic,bid from books where title like '%' ? '%' limit ?,?",
    [keyword,(pno-1)*psize,psize],function(err,result){
        if(err){
            throw err;
        }
        if(result.length>0){
            res.send({code:200,msg:result});
        }else{
            res.send({code:201,msg:"null"});
        }

    })



})






 module.exports=router;