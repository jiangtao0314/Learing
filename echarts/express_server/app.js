const express = require('express');
const app = express();
const home = require('./router.js')


// 拦截所有请求
app.use((req, res, next) => {
    // 1.允许哪些客户端访问我
    // * 代表允许所有的客户端访问我
    // 注意：如果跨域请求中涉及到cookie信息传递，值不可以为*号 比如是具体的域名信息
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
        // 2.允许客户端使用哪些请求方法访问我
    res.header('Access-Control-Allow-Methods', 'get,post')
        // 允许客户端发送跨域请求时携带cookie信息
    res.header('Access-Control-Allow-Credentials', true);
    next();


});


app.use('/api', home)





app.get('/', (req, res) => {
    res.send('123456')
})


app.listen(3000);
console.log('已启动');