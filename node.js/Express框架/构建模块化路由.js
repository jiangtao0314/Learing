const express = require('express');
const app = express();

const home = require('./home.js');
app.use('/home',home)

// const home = express.Router();

// app.use('/home',home); //一级路由
// home.get('/index',(req,res) =>{  //二级路由
//     res.send('欢迎拉到博客首页')
// })

app.listen(3000);
console.log('已启动');
