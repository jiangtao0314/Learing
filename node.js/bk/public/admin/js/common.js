//获取用户输入的表单信息
function huoquinput(form){
    let result = {};
    let formGroup = document.querySelectorAll('.form-group input');
    formGroup.forEach(function(value,index,array){
            for(var k in value){
                result[value.name] = value.value
            }
        })
        return result;
}

//对用户输入的内容进行验证
let froms = document.querySelector('#loginForm');
if(froms){
    froms.addEventListener('submit',function(e){
        let result = huoquinput(this)
        if(result.email.trim().length == 0){
            alert('请输入邮箱地址')
            e.preventDefault();
        }
        if(result.password.trim().length == 0){
            alert('请输入密码')
            e.preventDefault();
        }
        console.log(result)
    })
}
