const express = require("express");
var route = express.Router();
var db = require("../db"); //引入数据库封装模块
var config = require('./config.json');
// querystring这个模块，用来做url查询参数的解析
const querystring = require('querystring');
const request = require('request');
// 引入之后,后面的appId是在config内的appId名字
const appId = config.appId;
const appScrect = config.appScrect;

//返回数据规范
function Result ({ code = 200, msg = '接口请求成功', data = {} }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}

// 在这里之前前端需要将登录微信小程序时给的code返回给后端，后端通过相同的/getopenid来接受code
route.get('/getopenid',function (req, res){
    console.log(req.query) //查看请求的body里面的内容
    //将请求地址的url后面的参数拼接起来
    var data = {
        'appid': appId,
    	'secret': appScrect,
    	'js_code': req.query.code,
    	'grant_type': 'authorization_code'
    };
    console.log(data);
    // querystring的stringify用于拼接查询
    var content = querystring.stringify(data);
    // 根据微信开发者文档给的API
    var url = 'https://api.weixin.qq.com/sns/jscode2session?' + content;
    // 对url发出一个get请求
    request.get({
    'url': url
  	}, (error, response, body) => {
    // 将body的内容解析出来
    let abody = JSON.parse(body);
    // body里面包括openid和session_key
    console.log(abody)
    // 将请求的内容返回给前端
    res.json(abody)
  })
}) 

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