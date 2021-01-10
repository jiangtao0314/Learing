const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/12456',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(function(){
        console.log('连接成功');
    })
    .catch(function(err){
        console.log(err,'连接失败');
    })

const users = mongoose.model('User',new mongoose.Schema({name: {type:String}}));
const post = mongoose.model('Post',new mongoose.Schema({title: {type:String},
    author : {type: mongoose.Schema.Types.ObjectId,ref: 'User'}
    //这个指向的是集的名称User而不是定制规则的集users
})); 

// users.create({name: '张三'});
// post.create({title:'234', author: '5c0caae2c4e4081c28439791'})
post.find().populate('author').then((doc) => console.log(doc));
    