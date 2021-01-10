const express = require('express');
const app = express();

//网页维护页面
// app.use((req,res) =>{
//     res.send('正在维护')
// })


app.use('/admin',(req,res,next) =>{  
    let toLogin = true;
    if(toLogin){
        next();
    }else{
        res.send('您未登录')
    }
})
app.use('/admin',(req,res) =>{
    res.send('欢迎登陆')
})

//404页面
app.use((req,res) =>{
    res.status(404).send('404')
}) 

app.listen(3000);
console.log('已启动'); 