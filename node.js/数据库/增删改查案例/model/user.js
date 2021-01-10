const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlength:2
    },
    age:{
        type:Number,
        require:true,
        min:3,
        max:100,
    },
    password:{
        type:String
    },
    email:String,
    hobbies:[ String ]
})
const User = mongoose.model('User',userSchema);

//开放User变量
module.exports = User;