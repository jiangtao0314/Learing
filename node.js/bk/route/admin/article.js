const { Article } = require('../../model/article');
const dateFormat = require('dateformat');
const { template } = require('express-art-template');

//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');


template.defaults.imports.dateFormat = dateFormat;

module.exports = async (req,res) => {

    let page = req.query.page;
    //这是一个标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(10).display(3).populate('author').exec();
    //也可以新定义一个变量 把变量开放出去
    // let findArticles = await  pagination(Article).page(1).size(10).display(3).exec()
    //联合查询返回数据过大 或者mongoose更新
    var str = JSON.stringify(articles);
    articles = JSON.parse(str)
    
    // res.send(articles)

    res.render('admin/article',{
        articles:articles
    })
}