const http = require ('http');
const app = http.createServer();
const getRouter = require('router');
const router = getRouter();
const querystring = require('querystring')
require('./model/connect');
const Student = require('./model/user');
const template = require('art-template');
const path = require('path')
const servestatic = require('serve-static');
const dateFormat = require('dateformat');

const serve = servestatic(path.join(__dirname,'public'))

template.defaults.imports.dateFormat = dateFormat;
template.defaults.root = path.join(__dirname,'views');
template.defaults.extname = '.html'

//档案信息页面
router.get('/add',(req,res)=>{
    let add = template('index',{})
    res.end(add); 
})

//学生列表页面
router.get('/list',async (req,res)=>{
    let students = await Student.find()
    let list = template('list',{
        students: students,
    })
    res.end(list)
}) 


//添加学生信息进入数据库
router.post('/add',(req,res) =>{
     let fromData = '';
     req.on('data',function(param){
         fromData += param
     })
     req.on('end', async () =>{
        await Student.create(querystring.parse(fromData))
        res.writeHead(301,{
            Location: '/list'
        });
        res.end();
     })
})

app.on('request', (req,res) => {
    router(req,res,function(){
        console.log(1); //必选 不填报错
    })
    serve(req,res,function(){
        //必选 不填报错
    })
});
app.listen(80); 
console.log('服务器已启动')