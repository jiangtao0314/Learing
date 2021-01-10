const mongoose = require('mongoose');
const { func } = require('joi');
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        maxlength:20,
        minlength:4,
        required:[true,'请填写文章标题']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'请传递作者']
    },
    publisthDate:{
        type:Date,
        default:Date.now,
    },
    cover:{
        type:String,
        default:null,
    },
    content:{
        type:String,
    }
})

const Article = mongoose.model('Article',articleSchema);

module.exports = {
    Article
}
