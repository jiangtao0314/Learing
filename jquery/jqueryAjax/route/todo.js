const express = require('express');
const app = express()
const todos = express.Router();
const todo = require('../model/task')
const formidable = require('formidable');
const form = new formidable.IncomingForm();
const bodyParser = require('body-parser')

todos.use(bodyParser.urlencoded({ extended: false }))
todos.get('/task', async function(req, res) {
    let i = await todo.find()
    res.send(i)
})

todos.post('/addTask', async function(req, res) {
    console.log(req.body);
    await todo.create(req.body)
    res.send('ok')
})

todos.get('/removeTask', async(req, res) => {
    console.log(req.query);
    await todo.findOneAndDelete(req.query);
    res.send('ok')
})
todos.post('/modifyTask', async(req, res) => {
    console.log(req.body);
    await todo.updateOne({ _id: req.body._id }, { completed: req.body.completed })
    var a = await todo.findOne({ _id: req.body._id });
    //返回值为修改的数据
    res.send(a)
})
todos.post('/modifyTask2', async(req, res) => {
    console.log(req.body);
    await todo.updateOne({ _id: req.body._id }, { title: req.body.title })
    var a = await todo.findOne({ _id: req.body._id });
    //返回值为修改的数据
    res.send(a)
})


module.exports = todos;