const { User } = require('../../model/user')

module.exports = async (req, res) => {

	//这是一个标识 表示当前访问的是用户管理页面
	req.app.locals.currentLink = 'user';
	
	//获取到地址栏中的ID参数来判断修改或者判断
	const { message,id }= req.query;
	//如果传递了ID参数 就是修改操作 没有就是添加操作
	if(id){
		//修改操作
		let user = await User.findOne({_id: id});
		res.render('admin/user-edit',{
			message:message,
			user:user,
			link:'/admin/user-modify?id='+id,
			button:'修改'
		});
	}else{
		//添加操作
		res.render('admin/user-edit',{
			message:message,
			link:'/admin/user-edit',
			button:'添加'
		});
	}
}
