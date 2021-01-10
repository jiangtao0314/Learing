const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/plays',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(function(){
        console.log('数据库连接成功');
    })
    .catch(function(err){
        console.log(err,'连接失败');
    })

const courseSchema = new mongoose.Schema({
    name: {
        type : String,
        require: [true , '必填'],
        minlength:[2,'最小不超过2'],
        maxlength:[5,'最大不超过5'],
        trim:true
    }
})

const users = mongoose.model('User',courseSchema);

users.create({name:'445'})
    .then(doc => console.log(doc));