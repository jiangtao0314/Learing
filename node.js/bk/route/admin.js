const express = require('express');
const admin = express.Router();
const bodyParser = require('body-parser');
//导入用户集合构造函数
const {User} = require('../model/user')
const bcrypt = require('bcrypt')

admin.get('/login',(req,res) =>{
    res.render('admin/login');
})

//实现退出功能
admin.get('/logout',(req,res) => {
    //删除session cookie 重定向到用户登录 
})
//用户创建编辑界面路由
admin.get('/user-edit',require('./admin/user-edit'))

//添加用户功能
admin.post('/user-edit',require('./admin/user-edit-fn'))

//服务器端判断用户是否输入为空
//这句代码是接受post请求并解析
admin.use(bodyParser.urlencoded({extended:false}))
admin.post('/login',require('./admin/login'))

admin.get('/user',require('./admin/userPage'))

admin.post('/user-modify',require('./admin/user-modify'));

//删除用户功能路由
admin.get('/delete',require('./admin/user-delete'))

//文章列表路由
admin.get('/article',require('./admin/article'))
//文章编辑路由
admin.get('/article-edit',require('./admin/article-edit'));

//文章添加路由
admin.post('/article-add',require('./admin/article-add'));

module.exports = admin;
//itheima@itcast.cn