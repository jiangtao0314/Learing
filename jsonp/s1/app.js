const mongoose = require('mongoose');
const express = require('express');
const path = require('path')
const app = express();
const request = require('request')
const bodyParser = require('body-parser');
const formidable = require('formidable')
const session = require('express-session')

app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'secret key' }))

app.get('/test', (req, res) => {
    res.send('这是s1')
})
app.get('/server', (req, res) => {
    request('http://localhost:3000/cross', (err, response, body) => {
        res.send(body)
    })
})
app.post('/login', (req, res) => {
    var form = formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        const { username, password } = fields;
        if (username == 'itheima' && password == '123456') {
            req.session.isLogin = true;
            res.send({ message: '登录成功' })
        } else {
            res.send({ message: '登陆失败' });
        }
    })
})
app.get('/checkLogin', (req, res) => {
    res.send(req.session.isLogin)
})
app.listen(5000);
console.log('请访问localhost');