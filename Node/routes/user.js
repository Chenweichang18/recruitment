const express = require("express");
var route = express.Router();
var db = require("../db"); //引入数据库封装模块

//返回数据规范
function Result ({ code = 200, msg = '接口请求成功', data = {} }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}

//get请求
route.get('/get',(req,res)=>{
    db.query("SELECT * FROM qqm",[],function(results,fields){
        res.status(200).json(new Result({data : results}))
        console.log('/login/get接口被调用');
})
});

//post请求
route.post('/',(req,res)=>{
    console.log('收到请求体:',req.body);
    res.status(201).send('请求成功');
});

//导出子路由变量
module.exports = route;