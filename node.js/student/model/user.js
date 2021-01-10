const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        maxlength:10,
        required:true
    },
    age:{
        type:Number,
        min:10,
        max:50,
    },
    sex:{
        type:String
    },
    email:{
        type:String
    },
    hobbies:[String],
    collage:String,
    enterDate:{
        type:Date,
        default:Date.now,
    }
})
const Student = mongoose.model('Student',studentSchema);  

module.exports = Student;