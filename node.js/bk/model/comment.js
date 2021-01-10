const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    //文章id
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    time:{
        type:Date,
    },
    content:{
        type:String,
    }
})

const Comment = mongoose.model('comment',commentSchema);

//将评论集合构造函数作为模块成员进行导出
module.exports ={
    Comment
}