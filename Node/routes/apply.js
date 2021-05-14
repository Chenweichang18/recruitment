const express = require("express");
var route = express.Router();
var db = require("../db"); //引入数据库封装模块

//返回数据规范
function Result ({ code = 200, msg = '接口请求成功', data}) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}

//get请求,获取所有申请信息
route.get('/getAll',(req,res)=>{
    db.query("SELECT * FROM apply WHERE type = 'unde'",function(err,results){
        res.send({code:200,msg:'获取到所有申请管理员的数据',data:results})
        console.log('/apply/getAll接口被调用');
      })
      
});
//post请求,修改申请管理员的状态
route.post('/updateType', (req, res) => {
    var data = req.body
    db.query("UPDATE apply SET type=? WHERE openid=?",
        [data.type,data.openid])
    res.sendStatus(200)
    console.log('/updateType接口被调用');
});
//get请求，通过openid获取该用户是否申请成为管理员
route.get('/ifRegister',(req,res)=>{
    db.query("SELECT * FROM apply WHERE openid="+req.query.openid,function(err,results){
        res.send({code:200,msg:'获取到openid为'+req.query.openid+'的申请信息',data:results})
        console.log(err)
        console.log('/apply/ifRegister接口被调用');
      })
      
});
//post请求,招聘者注册成为管理员
route.post('/registerAccount', (req, res) => {
    var data = req.body
    db.query("INSERT INTO account(username,email,password) VALUES (?,?,?)", [data.username, data.email, data.password])
    res.sendStatus(200)
    console.log('/registerAccount接口被调用');
});
//get请求，招聘者账号登录
route.get('/loginAcc', (req, res) => {
    db.query("SELECT * FROM account WHERE username=" + req.query.username + "AND password=" + req.query.password, function (err, results) {
        console.log(results)
        if(results == '')
        {
            res.send('fail')
        }
        else
        {
            res.send('success')
        }
        console.log('/apply/loginAcc接口被调用');
    })
});
//get请求,获取所有招聘者账号信息
route.get('/getAllacc', (req, res) => {
    db.query("SELECT * FROM account", function (err, results) {
        res.send({ code: 200, msg: '获取到所有管理员的数据', data: results })
        console.log('/apply/getAllacc接口被调用');
    })

});
//get请求,通过email获取公司名
route.get('/getCompany', (req, res) => {
    db.query("SELECT * FROM apply WHERE email=" +req.query.email, function (err, results) {
        res.send({ code: 200, msg: '获取到数据', data: results })
        console.log('/apply/getCompany接口被调用');
    })

});
//get请求，通过公司名获取职位信息
route.get('/getMessage', (req, res) => {
    db.query("SELECT * FROM work WHERE company = '" + req.query.company +"'", function (err, results) {
        res.send({ code: 200, msg: '获取到公司信息', data: results })
        console.log(req.query)
        console.log('/work/getMessage接口被调用');
    })
});
//post请求，插入审核用户
route.post('/insertZP', (req, res) => {
    const data = req.body
    db.query("INSERT INTO apply(openid,username,company,person,email,address) VALUES (?,?,?,?,?,?)", [data.openid, data.username, data.company, data.person, data.email, data.address])
    res.sendStatus(200)
    console.log('/InsertMessage接口被调用');
});


//导出子路由变量
module.exports = route;