const express = require("express");
var route = express.Router();
var db = require("../db"); //引入数据库封装模块

//返回数据规范
function Result ({ code = 200, msg = '接口请求成功', data = {} }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}

//post请求,添加用户授权信息
route.post('/empower',(req,res)=>{
    var xingbie = '男'
    var data=req.body
    if(data.sex==1) xingbie = '男'
    if(data.sex==2) xingbie = '女'
    db.query("UPDATE user SET wx_name=?,sex=?,region=?,url=? WHERE openid=?",
            [   data.wx_name,
                xingbie,
                data.region,
                data.url,
                data.openid])
    res.sendStatus(200)
    console.log('/user/empower接口被调用');
});

//get请求,获取所有用户信息
route.get('/getAll', (req, res) => {
    db.query("SELECT * FROM user", function (err, results) {
        res.send({ code: 200, msg: '获取到所有用户数据', data: results })
        console.log('/user/getAll接口被调用');
    })

});
//get请求,根据openid获取用户信息
route.get('/getOne', (req, res) => {
    db.query("SELECT * FROM user WHERE openid=" + req.query.openid, function (err, results) {
        res.send({ code: 200, msg: '获取到用户数据', data: results })
        console.log('/user/getOne接口被调用');
    })

});
//get请求,获取所有动态信息
route.get('/getAlldt', (req, res) => {
    db.query("SELECT * FROM dynamic", function (err, results) {
        res.send({ code: 200, msg: '获取到所有动态数据', data: results })
        console.log('/user/getAll接口被调用');
    })

});
//get请求,获取所有面经信息
route.get('/getAllmj', (req, res) => {
    db.query("SELECT * FROM moreau", function (err, results) {
        res.send({ code: 200, msg: '获取到所有动态数据', data: results })
        console.log('/user/getAll接口被调用');
    })

});
//get请求,获取所有题目信息
route.get('/getAlltm', (req, res) => {
    db.query("SELECT * FROM wei", function (err, results) {
        res.send({ code: 200, msg: '获取到所有动态数据', data: results })
        console.log('/user/getAll接口被调用');
    })

});
//post请求,投递简历
route.post('/fabudt', (req, res) => {
    var data = req.body
    db.query("INSERT INTO dynamic(user,text) VALUES (?,?)", [data.user, data.text])
    res.sendStatus(200)
    console.log('/touJL接口被调用');
});
//导出子路由变量
module.exports = route;