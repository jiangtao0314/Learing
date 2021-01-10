const mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@localhost:27017/todo?authSource=admin', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(function() {
        console.log('数据库2连接成功');
    })
    .catch(function() {
        console.log('数据库2连接失败');
    })

const courseSchema = new mongoose.Schema({
    completed: {
        type: Boolean,
        require: true
    },
    title: {
        type: String,
        require: true
    }
})

const todo = mongoose.model('Todo', courseSchema);

// todo.create({
//     completed: false,
//     title: '吃饭'
// }, {
//     completed: false,
//     title: '睡觉',
// }, {
//     completed: false,
//     title: '拉屎'
// })

module.exports = todo