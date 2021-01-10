const express = require('express')
const app = express();
app.engine('art',require('express-art-template'));
const path = require('path');
app.set('views',path.join(__dirname,"views"));
app.set('view engine','art');

app.get('/',(req,res) =>{
    res.render('index');
})

app.listen(3000);
console.log('已启动');