const express = require('express');
const admin = express.Router();
const bodyParser = require('body-parser');
//导入用户集合构造函数
const {User} = require('../model/user')
const bcrypt = require('bcrypt')
const app = express();

admin.get('/login',(req,res) =>{
    res.render('admin/login');
})
admin.get('/article',(req,res) =>{
    res.render('admin/article')
})
admin.get('/article-edit',(req,res) =>{
    res.render('admin/article-edit')
})

admin.get('/user-edit',(req,res) =>{
    res.render('admin/user-edit')
})
//服务器端判断用户是否输入为空
//这句代码是接受post请求并解析
admin.use(bodyParser.urlencoded({extended:false}));
admin.post('/login',async(req,res) =>{
    const {email,password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0){
        return res.status(400).render('admin/error',{msg:'密码错误'})
    }
    //findOne是异步API 想要获取返回值必须设置异步函数
    //如果查找到user结果为对象 没找到结果为空
    let user = await User.findOne({email})
    if(user){ 
        //加密密码对比
        let isEqual = await bcrypt.compare(password,user.password)
        if(isEqual){
            //将用户名存储到请求对象中
            // req.session.username = user.name;
            //把用户存放到locals对象下面让所有模板获取到
            app.locals.user = user;
            //重定向到用户页面
            res.redirect('/admin/user')
        }else{
            //密码不匹配
            res.status(400).render('admin/error',{msg:'邮箱地址或者密码不正确'})
        }
    }else{
        //没有查询到
        res.status(400).render('admin/error',{msg:'无此用户'})
    }
})

admin.get('/user',(req,res) =>{
    res.render('admin/user',{
    })
})

module.exports = admin;
//itheima@itcast.cn