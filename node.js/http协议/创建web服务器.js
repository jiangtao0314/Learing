const http = require('http');
const app = http.createServer();
app.on('request',function(req,res){
    console.log(req);
    res.end('<h1>hi,user</h1>');
})
app.listen(3000);
console.log('服务器已经启动 请访问localhost:3000');