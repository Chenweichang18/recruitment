const express = require("express");
const app = express();
const routes = require("./routes");
const port = 3000;

app.use(express.json());
routes(app);
//get请求
app.get('/',(req,res)=>{
    res.send('欢迎来到对抗路');
});

//post请求
app.post('/',(req,res)=>{
    console.log('收到请求体:',req.body);
    res.status(201).send('请求成功');
});

//put请求
app.put("/:id",(req,res)=>{
    console.log("收到请求参数: id为: ",req.params.id);
    console.log("收到请求体: ",req.body);
    res.send();
})

//delete请求
app.delete("/:id",(req,res)=>{
    console.log("收到请求参数，id为: ",req.params.id);
    res.status(204).send();
})
//监听端口
app.listen(port,()=>{
    console.log('本地服务启动，端口号为3000')
    /* console.log(`Express server listening at http://localhost:${port}`) */
})



