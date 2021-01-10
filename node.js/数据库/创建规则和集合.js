const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/plays',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(function(){
        console.log('连接成功');
    })
    .catch(function(err){
        console.log(err,'连接失败');
    })
//设定集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
})
//创建集合并应用规则
const course = mongoose.model('Course',courseSchema);
//创建集合实例对象
const icorse = new course({
    name: '张三',
    author: '程序员',
    isPublished: true
})
icorse.save();


//另一种方法
// course.create({name:'李四',author:'老师',isPublished:true},function(err,doc){
//     console.log(err);
//     console.log(doc);
// })

//create返回的是一个promise对象 可以使用then和catch方法
course.create({name:'李四',author:'老师',isPublished:true})
    .then(function(doc){
        console.log(doc);
    })
    .catch(err => console.log(err));

