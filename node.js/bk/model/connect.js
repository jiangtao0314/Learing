const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}?${config.get('db.admin')}`,
{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    .then(()=>{console.log('连接成功')})
    .catch(() =>{console.log('连接失败');})
    
    
// mongoose.connect('mongodb://localhost:27017/blog', {
//     auth: {
//       authdb: 'admin',
//       user: 'root',
//       password: 'root'
//     }})
    

