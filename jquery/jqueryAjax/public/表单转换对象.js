// var form = document.querySelector('.form')
//         form.addEventListener('submit', function(e) {
//             e.preventDefault();
//             serializeObject($(this))
//             return false;
//         })
function serializeObject(obj) {
    var objs = {}
        //将对象转换为数组
        //serializeArray{name: 'username',value:'用户输入的内容'},{name: 'password',value:'用户输入的内容'}
    var params = obj.serializeArray();
    params.forEach(function(values, index, array) {
        objs[values.name] = values.value;
        console.log(objs);
    })
    return objs;
}