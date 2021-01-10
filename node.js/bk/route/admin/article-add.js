const formidable = require('formidable');
const path = require('path')
const { Article } = require('../../model/article')

module.exports = (req,res) =>{
    //创建解析对象
    const form = formidable({ multiples:true })
    //设置文件上传路径
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    //保留上传文件拓展名
    form.keepExtensions = true;

    //对表单进行解析
    form.parse(req, async (err,fields,files) => {
        if(err){
            console.log(err);
            return;
        }
    //err是错误对象 如果表单解析失败 存储错误信息
    //fields 对象类型 保存普通表单数据  非二进制的姓名 ID等
    //filed 对象类型 保存了和上传文件相关的数据
    // console.log(filed);
    //在files中有cover对象 cover里面的path保存有上传文件的网络路径
    // let lujing = files.cover.path.split('public')[1]

    //文章数据插入到数据库中
        await Article.create({
            title:fields.title,
            author:fields.author,
            publisthDate:fields.publisthDate,
            cover:files.cover.path.split('public')[1],
            content:fields.content,
        })
        res.redirect('/admin/article')
    })
}