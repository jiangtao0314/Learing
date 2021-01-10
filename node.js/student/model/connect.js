const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> console.log('1'))
    .catch(()=> console.log('2'))