const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');


// fs.readFile('./1.txt','utf8',function(err,doc){
//     console.log(doc);
//     fs.readFile('./2.txt','utf8',function(err,doc){
//         console.log(doc);
//         fs.readFile('./2.txt','utf8',function(err,doc){
//             console.log(doc);
//         })
//     })
// })


function p1(){
    return new Promise(function(resolve,reject){
        fs.readFile('./1.txt','utf8',function(err,doc){
            resolve(doc);
        })
    })
}

function p2(){
    return new Promise(function(resolve,reject){
        fs.readFile('./2.txt','utf8',function(err,doc){
            resolve(doc);
        })
    })
}

p1().then(function(r1){
    console.log(r1);
    return p2();
})
.then(function(r2){
    console.log(r2);
})