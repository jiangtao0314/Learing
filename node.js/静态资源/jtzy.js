const http = require('http');
const app = http.createServer();
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime')


app.on('request',function(req,res){
    // 获取用户的请求路径
    let pathname = url.parse(req.url).pathname

   
    pathname = pathname == '/' ? '/index.html':pathname; 
    //把/变为Index.html以便下面路径使用

    // 将用户的请求路径转换为实际的服务器硬盘路径
    let realPath = path.join(__dirname , 'public' + pathname)

    let type = mime.getType(realPath)

            fs.readFile(realPath,function(err,doc){
                if(err != null){
                    res.writeHead(404, {
                        'content-type': 'text/html;charset=utf8'
                    })
                    res.end('文件读取失败');
                    return
                }
                res.writeHead(200, {
                    'content-type': type   //第三方模块自动获取文件类型
                })        
                res.end(doc); //doc输出文件
            })
})
app.listen(3000);
console.log('已启动');
