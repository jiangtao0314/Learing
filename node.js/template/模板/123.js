const template = require('art-template');
const path = require('path');

const views = path.join(__dirname,'shouye.art')
const html = template(views,{
    msg:'shouye',
    time: new Date()
});
console.log(html);
