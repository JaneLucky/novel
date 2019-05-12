//检测变量是否存在于localStorage中
function checkStorage(bid){
    if(localStorage.getItem(`bookMark${bid}`)==null){//以前没有添加到书架,添加到书架，返回false
        return false;
    }else{//以前有添加到书架,返回true
        return true;
    }
}