const http = require('http');
const app = http.createServer();
const querystring = require('querystring'); //querystring模块
var  a = ''


app.on('request',function(req,res){

    res.writeHead(200,{  //修改内容类型
        'content-type' : 'text/html ; charset = utf8'
    })
    
    let poseData = '';
    req.on('data',function(chunk){
        poseData += chunk;
    });
    req.on('end',function(){
        a = querystring.parse(poseData);
    })
    res.end('ok');
    console.log(a.username);
    console.log(a.password);
});
app.listen(3000);
console.log('已启动 localhost:3000');
