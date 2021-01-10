const template = require('art-template');
const path = require('path');

const views = path.join(__dirname,'views','index.art')
const html = template(views,{
    data:[{
        name:'zs',
        age:22
    },{
        name:'ls',
        age:22
    }],
    user:{
        name:'ww',
        age:52
    }
})
console.log(html);
