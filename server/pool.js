const mysql = require("mysql");
const pool=mysql.createPool({
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"",
    database:"vue_mysql",
    connectionLimit:15  //设置15个连接
})

module.exports=pool;