var btn = document.querySelector('#btn')
btn.addEventListener('click', () => {
    jsonp({
        url: 'http://localhost:3000/better',
        data: {
            name: 'lisi',
            age: 30
        },
        success: function(data) {
            console.log(123);
            console.log(data);
        }
    })
})

function jsonp(options) {
    //转换opsions.data传递过来的数据 转换为name=lisi&age=30
    var params = '';
    for (var attr in options.data) {
        params += '&' + attr + '=' + options.data[attr]
    };
    //动态创建script标签
    var script = document.createElement('script');
    //防止多次点击不同按钮覆盖  
    var fnName = 'myJsonp' + Math.random().toString().replace('.', '');
    //给全局作用域window定义一个属性，让他等于返回的处理函数,让这个处理函数等于全局函数
    //点后面不能跟变量， 只能使用中括号
    window[fnName] = options.success;
    //为script标签添加src属性
    script.src = options.url + '?callback=' + fnName + params;
    //将script标签添加到页面中
    document.body.appendChild(script);
    //删除script标签
    script.addEventListener('load', function() {
        document.body.removeChild(script)
    })
}