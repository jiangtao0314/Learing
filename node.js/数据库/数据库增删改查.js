//创建规则 创建集合应用规则
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/plays',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(function(){
        console.log('连接成功');
    })
    .catch(function(err){
        console.log(err,'连接失败');
    })

const courseSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hobbies: Array,
    email : String,
    password: Number
})

const users = mongoose.model('User',courseSchema);

//---------------------------------------------------------------------
//增
//const userss = new users({
//    name:'猫',
//    age: 18,
//    hobbies: ['吃','喝'],
//    email : '123456@qq.com',
//    password: 123
//})
//userss.save();
//
//users.create({
//name:'狗',
//age: 28,
//hobbies: ['拉','撒'],
//email : '1234562@qq.com',
//password: 1233
//})
//.then(function(doc){
//    console.log(doc);
//})
//.catch(function(err){
//    console.log(err);
//})


//-----------------------------------------------------------------------------
//查
users.find({name:'狗'}).then(function(doc){
    console.log(doc);
})
//查二
users.findOne({age:18}).then(function(doc){
    console.log(doc);
})
//大于或小于
// users.find({age:{$gt:18,$lt:30}}).then(function(doc){
//     console.log(doc);
// })
//含有某数值
users.find({hobbies:{$in:['拉']}}).then(function(doc){
    console.log(doc);
})
//选择要查询的字段  不想查的加-
users.find().select('name email -_id').then(doc => console.log(doc));
//根据字段数字大小进行排列
users.find({age:{$gt:18,$lt:30}}).sort('age').then(doc => console.log(doc));

//--------------------------------------------------------------------------------
//删

//删一条
users.findOneAndDelete({name :'狗'}).then(doc => console.log(doc));
//删多条/全部
users.deleteMany({}).then(doc => console.log(doc));

//------------------------------------------------------------------
//改
users.updateOne({name:'狗'},{name:'狗狗'}).then(doc => console.log(doc));

users.updateMany({name:'狗'},{name:'狗狗'}).then(doc => console.log(doc));