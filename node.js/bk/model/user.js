const mongoose = require('mongoose');
//引入加密模块
const bcrypt = require('bcrypt');

const Joi = require('joi');
const { func } = require('joi');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        minlength:5,
        maxlength:15,
        required:true
    },
    email:{
        type:String,
        required:true,
        //保证邮箱地址不重复 
        unique:true, 
    },
    password:{
        type:String,
        required:true
    },
    //admin :超级管理员
    //normal :用户
    role:{
        type:String,
        required:true
    },
    state:{
        type:Number,
        //0启用状态  1禁用状态
        default:0,
    }
})
const User = mongoose.model('User',userSchema);

//     async function createUser(){
//         const salt = await bcrypt.genSalt(10);
//         const pass = await bcrypt.hash('123456',salt);
//         const user = await User.create({
//             username:'itheima',
//             email:'itheima@itcast.cn',
//             password: pass,
//             role:'admin',
//             state:0
//     })
//     console.log('创建成功');
// }

// createUser();

//将用户集合作为模块成员导出
//User是数据库中的一个集合，包含users里面所有的数据

//用户验证规则
function validateUser (user){
    const schema = Joi.object({
        username:Joi.string().min(2).max(15).required().error(new Error('用户名格式错误')),
        email:Joi.string().email().required().error(new Error('邮箱格式错误')),
        password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role:Joi.string().valid('normal','admin').required().error(new Error('角色值非法')),
        state:Joi.number().valid(0,1).required().error(new Error('状态值非法')),
    })
    return schema.validateAsync(user)
}


module.exports = {
    User,
    validateUser
};