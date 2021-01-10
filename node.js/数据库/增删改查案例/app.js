// 搭建网站服务器，实现客户端与服务器端的通信
// 连接数据库，创建用户集合，向集合中插入文档
// 当用户访问/list时，将所有用户信息查询出来
// 	实现路由功能
// 	呈现用户列表页面
// 	从数据库中查询用户信息 将用户信息展示在列表中
// 将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
// 	修改用户信息分为两大步骤
// 		1.增加页面路由 呈现页面
// 			1.在点击修改按钮的时候 将用户ID传递到当前页面
// 			2.从数据库中查询当前用户信息 将用户信息展示到页面中
// 		2.实现用户修改功能
// 			1.指定表单的提交地址以及请求方式
// 			2.接受客户端传递过来的修改信息 找到用户 将用户信息更改为最新的
// 当用户访问/delete时，实现用户删除功能
const http = require('http');

const url = require('url')
const querystring = require('querystring')
const app = http.createServer();

require('./model/sjk.js');
const User = require('./model/user.js');

app.on('request',async function(req,res){
    const method = req.method;
    //对象解构  获取urlpathname的网址
    const { pathname,query } = url.parse(req.url,true);   
    //查找数据库
    let users = await User.find(); 
    //不同表单验证走不同方法
    if(method == 'GET'){
        //list页面
        if(pathname == '/list'){
            //显示静态页面 并遍历数据库内的数据赋值给list
            let list = `
            <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>用户列表</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<h6>
			<a href="/add" class="btn btn-primary">添加用户</a>
		</h6>
		<table class="table table-striped table-bordered">
			<tr>
				<td>用户名</td>
				<td>年龄</td>
				<td>爱好</td>
				<td>邮箱</td>
				<td>操作</td>
			</tr>
            `
            users.forEach( items => {
                list += `
                <tr>
                <td>${items.name}</td>
                <td>${items.age}</td>
                <td>
                `
                //双重遍历 遍历爱好并显示到页面
                items.hobbies.forEach(item => {
                list += `<span>${item}</span>`
                    })
                
                list += `
                    </td>
                    <td>${items.email}</td>
                    <td>
                    <a href="/remove?id=${items._id}" class="btn btn-danger btn-xs">删除</a>
                    <a href="/modify?id=${items._id}" class="btn btn-success btn-xs">修改</a>
                    </td>
                    `
            });
            list += `
            
            </tr>
            </table>
            </div>
            </body>
            </html>
            `
            //显示html页面
            res.end(list);
        }
        //add页面
        else if(pathname == '/add'){
            let add = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>添加用户</h3>
                    <form method="POST" action = "/add">
                      <div class="form-group">
                        <label>用户名</label>
                        <input type="text" class="form-control" name = "name" placeholder="请填写用户名">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input type="password" class="form-control" name = "password" placeholder="请输入密码">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input type="text" class="form-control" name ="age" placeholder="请填写年龄">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input type="email" class="form-control" name = "email" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
                            <label class="checkbox-inline">
                              <input type="checkbox" name = "hobbies" value="足球"> 足球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" name = "hobbies" value="篮球"> 篮球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" name = "hobbies" value="橄榄球"> 橄榄球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" name = "hobbies" value="敲代码"> 敲代码
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" name = "hobbies" value="抽烟"> 抽烟
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" name = "hobbies" value="喝酒"> 喝酒
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" name = "hobbies" value="烫头"> 烫头
                            </label>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">添加用户</button>
                    </form>
                </div>
            </body>
            </html>`
            res.end(add)
        }
        //查询信息并渲染到页面中
        else if(pathname == '/modify'){
            let user = await User.findOne({_id :query.id})
            let hobbies = ['足球','篮球','橄榄球','抽烟','喝酒','烫头']
            let modify = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>修改用户</h3>
                    <form method="POST" action="/modify?id=${user._id}">
                      <div class="form-group">
                        <label>用户名</label>
                        <input type="text"  name="name" class="form-control" value = "${user.name}">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input type="password" name="password" class="form-control"value = "${user.password}">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input type="text" name="age" class="form-control" value = "${user.age}">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input type="email" name="email" class="form-control" value = "${user.email}">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
            `
            //遍历爱好并渲染到页面中
            hobbies.forEach(item =>{
                let isHobby = user.hobbies.includes(item);
                console.log(isHobby);
                if(isHobby){
                    modify += `
                    <label class="checkbox-inline">
                    <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                    </label>
                    `
                }else{
                    modify += `
                    <label class="checkbox-inline">
                    <input type="checkbox" value="${item}" name="hobbies"> ${item}
                    </label>
                    `
                }
            })

            modify += `
            </div>
                      </div>
                      <button type="submit" class="btn btn-primary">修改用户</button>
                    </form>
                </div>
            </body>
            </html>
            `
            res.end(modify);
        }
        else if(pathname == '/remove'){
          await User.deleteOne({_id: query.id});
          res.writeHead(301, {
            Location: '/list'
          });
          res.end();
        }
        
    }else if(method == 'POST'){
        //用户添加功能
        if(pathname == '/add'){
            //接受用户提交的信息并提交到数据库
            let formdata = '';
            req.on('data',param =>{
                formdata += param;
            })
            req.on('end',async () =>{
                let user = querystring.parse(formdata);
                await User.create(user)
                res.writeHead(301,{
                    Location : '/list'
                })
                res.end();
            })
        }
        else if(pathname == '/modify'){
            //接受用户提交的信息并提交到数据库
            let formData = '';
            req.on('data',param =>{
                formData += param;
            })
            console.log(formData);
            req.on('end',async () =>{
                let user = querystring.parse(formData);
                await User.updateOne({_id: query.id}, user);
                res.writeHead(301,{
                    Location : '/list'
                });
               
                res.end();
            })
        }
    }
})


app.listen(3000);
console.log('服务器已启动')