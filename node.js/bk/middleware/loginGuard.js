const guard = (req,res,next) =>{
	//判断用户的登录状态和页面  重定向登录页面
	if(req.url != '/login' && !req.session.username){
		res.redirect('/admin/login')
	}else{
		if(req.session.role == 'normal'){
			//如果用户是普通用户就重定向到home页面
			return res.redirect('/home/')
		}
		//用户是登录状态将用户放行
		next()
	}
}

module.exports = guard;