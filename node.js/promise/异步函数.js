const fs = require('fs');
let promisify = require('util').promisify
//对异步API进行包装，让方法返回promise对象

var readFile = promisify(fs.readFile);
async function run(){
    let r1 = await readFile('./1.txt','utf8')
    let r2 = await readFile('./2.txt','utf8')
    console.log(r1);
    console.log(r2);
}
run();