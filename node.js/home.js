const express = require('express');
const home = express.Router();

home.get('/',(req,res) =>{
    res.rend('欢迎来到首页')
})

module.exports = home;
