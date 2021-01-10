function ajax(options) {

    //存储默认值
    var defaults = {
        type: 'get',
        url: '',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function() {},
        error: function() {}
    }

    //浅拷贝
    Object.assign(defaults, options);

    var xhr = new XMLHttpRequest();
    // //拼接参数变量  将json对象转换为字符串格式
    // var params = '';
    // for (var attr in defaults.json) {
    //     params += attr + '=' + defaults.json[attr] + '&'
    //         //对象后面不能点变量 把点换成中括号    
    // }

    // params = params.substr(0, params.length - 1)

    if (defaults.type == 'get') {
        (defaults.data ? defaults.url = defaults.url + '?' + defaults.data : defaults.url)
    }
    xhr.open(defaults.type, defaults.url);
    //如果请求方式等于post
    if (defaults.type == 'post') {
        //设置请求参数格式的类型
        var contentType = defaults.header['Content-Type']
        xhr.setRequestHeader('Content-Type', contentType)

        //判断传递类型是否为json
        if (contentType == 'application/json') {
            xhr.send(JSON.stringify(defaults.json))
        } else {
            xhr.send(defaults.data);
        }

    } else {
        xhr.send();
    }
    xhr.addEventListener('load', function() {

        //xhr.getResponseHeader()
        //获取响应头中的数据
        var contentType = xhr.getResponseHeader('Content-Type');

        //接收服务端返回的数据
        var responseText = xhr.responseText;
        if (contentType) {
            //判断字符串是否包含json includes是ES6方法
            if (contentType.includes('application/json')) {
                //把返回的JSON字符串类型转换为JSON对象
                responseText = JSON.parse(responseText);
            }
        }



        //当http状态码等于200的时候
        if (xhr.status == 200) {
            //请求成功调用处理成功的函数
            defaults.success(responseText, xhr);
        } else {
            //请求失败
            defaults.error(responseText, xhr);
        }

    })
}