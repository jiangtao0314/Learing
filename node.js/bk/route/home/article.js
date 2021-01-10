const {Article} = require('../../model/article')
//导入评论集合构造函数
const {Comment} = require('../../model/comment')
module.exports = async (req,res) =>{
    //接受客户端传递过来的文章ID
    const id = req.query.id;
    //根据ID查询详细信息
    let article = await Article.findOne({_id:id}).populate('author');
    //JSON转换
    var a = JSON.stringify(article);
    article = JSON.parse(a)

    //查询当前文章所对应的评论信息
    let comments = await Comment.find({aid: id}).populate('uid')
    var b = JSON.stringify(comments);
    comments = JSON.parse(b);
    console.log(comments);
    // res.send('欢迎来到博客文章详情页')
    res.render('home/article',{
        article : article,
        comments : comments
    })
}