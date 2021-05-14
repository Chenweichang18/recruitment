const express = require("express");
var route = express.Router();
var db = require("../db"); //引入数据库封装模块

//返回数据规范
function Result ({ code = 200, msg = '接口请求成功', data}) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}

//get请求,获取所有职位信息
route.get('/getAll',(req,res)=>{
    db.query("SELECT * FROM work",function(err,results){
        res.send({code:200,msg:'获取到所有职位数据',data:results})
        console.log('/work/getAll接口被调用');
      })
      
});
//get请求，通过id获取所有职位信息
route.get('/getDetailed',(req,res)=>{
    db.query("SELECT * FROM work WHERE id="+req.query.id,function(err,results){
        res.send({code:200,msg:'获取到id为'+req.query.id+'的职位详情信息',data:results})
        console.log('/work/getDetailed接口被调用');
      })
      
});
//get请求，通过openid和work的id获取是否收藏
route.get('/ifcol',(req,res)=>{
    db.query("SELECT * FROM collection WHERE openid="+req.query.openid,function(err,results){
        //res.send({code:200,msg:'获取到id为'+req.query.id+'的职位详情信息',data:results})
        //console.log('/work/getDetailed接口被调用');
        var arr = JSON.parse(results[0].Clist)
        var workid = req.query.workid
        if(arr.indexOf(workid)>-1)
        {
            res.send({code:200,msg:'已收藏'})
            console.log('/work/ifcol接口被调用');
        }
        else 
            res.send({code:200,msg:'未收藏'})
            console.log('/work/ifcol接口被调用');
      })
      
});
//get请求，修改用户收藏数
route.get('/colIn',(req,res)=>{
    db.query("SELECT * FROM collection WHERE openid="+req.query.openid,function(err,results){
        //res.send({code:200,msg:'获取到id为'+req.query.id+'的职位详情信息',data:results})
        //console.log('/work/getDetailed接口被调用');
        var arr = JSON.parse(results[0].Clist)
        var workid = req.query.workid
        var openid = req.query.openid
        if(arr.indexOf(workid)>-1)
        {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == workid) {
                  arr.splice(i, 1);
                  break;
                }
              }
              db.query("UPDATE collection SET Clist=? WHERE openid=?",
              [ 
                JSON.stringify(arr),
                JSON.parse(openid)
                ])
            res.send({msg:'已取消收藏'})
            console.log('/work/colIn接口被调用');
        }
        else
        {
            arr.push(workid)
            db.query("UPDATE collection SET Clist=? WHERE openid=?",
              [ 
                JSON.stringify(arr),
                JSON.parse(openid)
                ])
            res.send({msg:'收藏成功'})
            console.log('/work/colIn接口被调用');
        }
      })
    
      
});
//get请求，通过openid获取所有收藏记录
route.get('/colSum',(req,res)=>{
    db.query("SELECT * FROM collection WHERE openid="+req.query.openid,function(err,results){
        //res.send({code:200,msg:'获取到id为'+req.query.id+'的职位详情信息',data:results})
        //console.log('/work/getDetailed接口被调用');
        var arr = JSON.parse(results[0].Clist)
        var workid = req.query.workid
        var str=''
        var crr=''
        console.log(arr)
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i]!=null&&arr[i+1]!=null)
              {
                  crr=crr+arr[i]+','
              }
            if(arr[i]!=null&&arr[i+1]==null)
            {
              crr=crr+arr[i]
              str="SELECT * FROM WORK WHERE id IN (" + crr + ")";
            }
        }
        db.query(str,function(err,results){
            res.send({code:200,msg:'获取到该用户收藏的职位',data:results})
            
          })
      })
      
});
//get请求，通过城市获取附近职位信息
route.get('/getCitywork',(req,res)=>{
    var cityList=[]
    db.query("SELECT * FROM work",function(err,results){
        results.forEach(item=>{
            if(item.place.indexOf(req.query.city)>-1)
            {
                cityList.push(item)
            }
        })
        res.send({code:200,msg:'获取到附近职位详情信息',data:cityList})
        console.log('/work/getCitywork接口被调用');
      })
      
});
//post请求，插入新职业
route.post('/InsertMessage', (req, res) => {
    const data = req.body
    db.query("INSERT INTO work(company,job,scale,money,place,EXP,edu,label,hr,skill1,skill2,skill3,skill4,skill5) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [data.company, data.job, data.scale, data.money, data.place, data.EXP, data.edu, data.label, data.hr, data.skill1, data.skill2, data.skill3, data.skill4, data.skill5])
    res.sendStatus(200)
    console.log('/InsertMessage接口被调用');
});
//get请求，通过发布职位id获取该id下所有应聘者信息
route.get('/getYuser', (req, res) => {
    db.query("SELECT * FROM toudi WHERE id=" + req.query.id + "&&type='unde'", function (err, results) {
        res.send({ code: 200, msg: '获取到id为' + req.query.id + '的职位详情信息', data: results })
        console.log('/work/getYuser接口被调用');
    })

});
//get请求，通过openid获取该id下所有职位信息
route.get('/getYid', (req, res) => {
    db.query("SELECT * FROM toudi WHERE openid=" + req.query.openid, function (err, results) {
        res.send({ code: 200, msg: '获取到id为' + req.query.openid + '的职位详情信息', data: results })
        console.log('/work/getYid接口被调用');
    })

});
route.get('/qzCom', (req, res) => {
    var arr = JSON.parse(req.query.idList)
    var str = ''
    var crr = ''
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != null && arr[i + 1] != null) {
            crr = crr + "'" + arr[i] + "'" + ','
        }
        if (arr[i] != null && arr[i + 1] == null) {
            crr = crr + "'" + arr[i] + "'"
            str = "SELECT * FROM work WHERE id IN (" + crr + ")";
        }
    }
    db.query(str, function (err, results) {
        res.send({ code: 200, msg: '获取到该职位id下的所有投递用户', data: results })

    })

});
route.get('/getYuser2', (req, res) => {
    db.query("SELECT * FROM toudi WHERE type!='unde'", function (err, results) {
        res.send({ code: 200, msg: '获取到职位详情信息', data: results })
        console.log('/work/getYuser2接口被调用');
    })

});
//get请求，通过openid获取所有求职者数据
route.get('/qzUsers', (req, res) => {
        var arr = JSON.parse(req.query.userList)
        var str = ''
        var crr = ''
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != null && arr[i + 1] != null) {
                crr = crr + "'" +arr[i] + "'" + ','
            }
            if (arr[i] != null && arr[i + 1] == null) {
                crr = crr + "'" + arr[i] + "'"
                str = "SELECT * FROM USER WHERE openid IN (" + crr + ")";
            }
        }
        db.query(str, function (err, results) {
            res.send({ code: 200, msg: '获取到该职位id下的所有投递用户', data: results })

        })

});
//post请求，通过与不通过简历筛选
route.post('/setType', (req, res) => {
    var data = req.body
    db.query("UPDATE toudi SET type=? WHERE openid=?",
        [data.type, data.openid])
    res.sendStatus(200)
    console.log('/setType接口被调用');
});
//post请求，通过与不通过简历筛选
route.post('/setType2', (req, res) => {
    var data = req.body
    db.query("UPDATE toudi SET type=?,time=?,address=? WHERE openid=?",
        [data.type, data.ms_time, data.ms_address, data.openid,])
    res.sendStatus(200)
    console.log('/setType2接口被调用');
});
//get请求模糊查询，获取包含参数的数据
route.get('/getMohu', (req, res) => {
    console.log(req.query.name)
    db.query("SELECT * FROM WORK WHERE job LIKE '%" + "'" + req.query.name + "'" + "%'", function (err, results) {
        res.send({ code: 200, msg: '获取到id为' + req.query.name + '的职位详情信息', data: results })
        console.log('/work/getMohu接口被调用');
    })
});
//post请求,投递简历
route.post('/touJL', (req, res) => {
    var data = req.body
    db.query("INSERT INTO toudi(id,openid) VALUES (?,?)", [data.id, data.openid])
    res.sendStatus(200)
    console.log('/touJL接口被调用');
});
//导出子路由变量
module.exports = route;