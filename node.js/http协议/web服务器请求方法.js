const http = require ('http');
const app = http.createServer();
const url = require('url');


app.on('request',function(req,res){

    res.writeHead(400,{
        'content-type':'text/html,charset=utf8'
    })

    const pathname = url.parse(req.url).pathname  //获取URL ？之前 /包括之后
    console.log(url.parse(req.url));
    if(req.method == 'GET'){
        if(pathname == '/' || pathname == '/index'){
            res.end('欢迎来到首页')
        }  else if(pathname == '/list'){
            res.end('欢迎来到标签页')
        }else{
            res.end('404')
        }
    }else if(req.method == 'POST'){
        if(pathname == '/' || req.url == '/index'){
            res.end('欢迎来到首页')
        }  else if(pathname == '/list'){
            res.end('欢迎来到标签页')
        }else{
            res.end('404')
        }
    }

})
app.listen(3000);
console.log('已启动');