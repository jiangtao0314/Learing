// 引用expess框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 创建网站服务器
const app = express();
//引入morgan
const morgan = require('morgan');
//导入config模块
const config = require('config')

console.log(config.get('title'))

// 数据库连接
require('./model/connect');
require('./model/user')
// 处理post请求参数
app.use(bodyPaser.urlencoded({extended: false}));
// 配置session
app.use(session({
	secret: 'secret key',
	//用户没登录的情况下不保存cookie
	saveUninitialized: false,
	//resave是指每次请求都重新设置session cookie
	resave: false,
	//设置cookie过期时间 下次可以自动登录 
	cookie: {
		//设置数为毫秒
		maxAge: 24 * 60 * 60 * 1000
	}
}));


if(process.env.NODE_ENV == 'development'){
	app.use(morgan('dev'))
}else{
	console.log('这是生产环境');
}

// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

//拦截请求 判断用户登录状态
app.use('/admin',require('./middleware/loginGuard'))

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
const { json } = require('body-parser');

// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

//错误处理中间件
app.use((err, req, res, next) => {
	// 将字符串转换为对象类型
	// JSON.parse() 
	//模板问题可以使用并且的短路原理判断user是否存在  user && user.username
	var a = typeof(err);
	let params = [];
	if(a == 'string'){
		const result = JSON.parse(err);
		for(var attr in result){
			if(attr != 'path'){
				params.push(attr + '=' + result[attr]);
			}
		}
		//数组转换为字符串 用&分割
		res.redirect(`${result.path}?${params.join('&')}`);
		
	}
	else{
		res.send('有非字符串的错误数据传递过来，大概率是模板问题')
		console.log(err);
	}
})

// 监听端口
app.listen(80);
console.log('网站服务器启动成功, 请访问localhost')