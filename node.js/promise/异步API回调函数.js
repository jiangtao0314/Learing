function a(callback){
    callback({   //callback调用匿名函数 把值传给了data
        msg : 'hello node.js'
    });
}
a(function (data){
    console.log(data);
})