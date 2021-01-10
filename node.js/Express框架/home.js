const express = require('express');
const path = require('path')
const app = express();

app.engine('art',require('express-art-template'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','art');
app.get('/',(req,res)=>{
    app.locals.user = {
        name:'zs',
        age:'18'
    }
    res.render('index')
})


app.listen(80);
console.log('已启动');