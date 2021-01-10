const express = require('express');
const app = express();
const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);

//同步API错误处理方法
// app.get('/index',(req,res) =>{
//     throw new Error('程序发生了错误');
// })
// app.use((err,req,res,next) =>{
//     res.status(500).send(err.message);
// })


//异步API错误处理方法
// app.get('/index',(req,res,next) =>{
//     fs.readFile('1234.32rs','utf8',(err,result) =>{
//         if(err != null){
//             next(err);
//         }else{
//             res.send(result)
//         }
//     })
// })

//异步函数错误处理方法
app.get('/',async(req,res,next) =>{
    try{
        await readFile('./aaa.js')
    }catch(ex){
        next(ex);
    }
})
//如果await代码发生错误 就跳转到catch执行代码 如果正确就跳过catch直接到下面


app.listen(3000);
console.log('已启动');