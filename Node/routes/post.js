const express = require("express");
var route = express.Router();
var db = require("../db"); //引入数据库封装模块

//get请求
route.get('/',(req,res)=>{
    db.query("SELECT * FROM qqm",[],function(results,fields){
        console.log(results);
      })
});

//post请求
route.post('/',(req,res)=>{
    console.log('收到请求体:',req.body);
    res.status(201).send('请求成功');
});

//put请求
route.put("/:id",(req,res)=>{
    console.log("收到请求参数: id为: ",req.params.id);
    console.log("收到请求体: ",req.body);
    res.send();
})

//delete请求
route.delete("/:id",(req,res)=>{
    console.log("收到请求参数，id为: ",req.params.id);
    res.status(204).send();
})

//导出子路由变量
module.exports = route;