const { User } = require("../../model/user");
const bcrypt = require('bcrypt')
module.exports = async (req,res,next) =>{
    //这是一个标识 表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    
    //post方式获取用户信息  get方法获取用户id
    const { username, email, role, state,password} = req.body;
    const id = req.query.id;
    //数据库根据id属性查找数据
    let user = await User.findOne({_id:id});
    //密码比对
    const isValid = await bcrypt.compare(password,user.password);

    if(isValid){
        //比对成功 将用户信息更新到数据库
        await User.updateOne({_id:id},{
            username:username,
            email:email,
            role:role,
            state:state
        })
        res.redirect('/admin/user')
    }else{
        //让obj变量接受传递给错误处理中间件的信息
        let obj = {path:'/admin/user-edit',message:'密码错误，不能进行信息修改',id:id}
        next(JSON.stringify(obj));
    }
}