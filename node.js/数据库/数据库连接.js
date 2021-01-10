const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/123456',{useNewUrlParser: true,useUnifiedTopology: true})
    .then(function(){
        console.log('数据库连接成功');
    })
    .catch(function(err){
        console.log('连接失败',err);
    })   