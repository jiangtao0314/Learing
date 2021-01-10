const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page')
const dateFormat = require('dateformat');
const { date } = require('joi');
const { template } = require('express-art-template')
template.defaults.imports.dateFormat = dateFormat;

module.exports = async (req,res) =>{
    var page = req.query.page
    //使用联合查询之前author保存的是ID 之后保存的是对象 保存着详细信息
    //查询文章下面保存的作者ID下面的作者详细信息  使用populate联合查询
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    // res.send(result)
    // return;
    var a = JSON.stringify(result);
    result = JSON.parse(a);


    // res.send('欢迎来到博客首页')
    res.render('home/default',{
        result: result
    })
}