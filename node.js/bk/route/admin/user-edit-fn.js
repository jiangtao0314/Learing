const Joi = require('joi')
//
const { User,validateUser} = require('../../model/user');
const bcrypt = require('bcrypt');

//定义对象验证规则;
module.exports = async (req,res,next) =>{
	
		try{
			//实施验证
			await validateUser(req.body)
		}
		catch(e){
			//验证没有通过 重定向回此页面 地址栏传输错误信息
			
			// return res.redirect(`/admin/user-edit?message=${e.message}`)
			//JSON.stringify() 将对象转换为字符串类型  交给app.js错误中间件处理
			return next(JSON.stringify({path: '/admin/user-edit', message: e.message}))
			
		}
		//根据邮箱地址查询用户是否存在
		//res.redirect包含了res.end方法  如再遇到res.send会报错  需要加return
		let user = await User.findOne({email: req.body.email})
			if(user){
				// return res.redirect('/admin/user-edit?message=邮箱已被占用')
				return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址已经被占用'}))
			}else{
				let salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password,salt)
				await User.create(req.body)
			}
			if(req.body.username )
		res.redirect('/admin/user');
}
