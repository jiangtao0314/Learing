const http = require('http');
const app = http.createServer();
const url = require('url'); //url模块



app.on('request',function(req,res){

    res.writeHead(200,{  //修改内容类型
        'content-type' : 'text/html ; charset = utf8'
    })
    let { query , pathname } = url.parse(req.url,true); //对象解构
    console.log(query.age);
    console.log(query.name);

    if(pathname == '/index' || pathname == '/'){  //判断页面
        res.end('<h2>欢迎来到首页</h2>');
    }else if(pathname == '/list'){
        res.end('欢迎来到标签页')
    }else{
        res.end('not found')
    }
   
})

app.listen(3000);
console.log('已启动 localhost:3000');
