const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const { listeners } = require('process');
const app = express();
const mongoose = require('mongoose');
const formidable = require('formidable')




mongoose.connect('mongodb://root:root@localhost:27017/blog?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function() {
        console.log('数据库连接成功');
    })
    .catch(function() {
        console.log('数据库连接失败');
    })

//post req.body请求参数代码 如果AJAX使用JSON格式传入可以使用JSON
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/first', (req, res) => {
    res.send('hello ajax')
})
app.post('/first', (req, res) => {
    res.send('hello ajax')
})

app.get('/responseData', (req, res) => {
    res.send({ "name": "张三" })
})
app.post('/responseData', (req, res) => {
    res.send({ "name": "张三" })
})

app.get('/get', (req, res) => {
    res.send(req.query)
})

app.post('/post', (req, res) => {
    console.log(req.body);
    res.send(req.body)
})

app.post('/json', (req, res) => {
    res.send(req.body)
})

app.get('/error', (req, res) => {
    res.status(400).send('not ok')
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 5,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        required: true,
        //保证邮箱地址不重复 
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    //admin :超级管理员
    //normal :用户
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        //0启用状态  1禁用状态
        default: 0,
    }
})
const User = mongoose.model('User', userSchema);

//验证邮箱唯一性  接口
app.get('/verifyEmailAdress', async(req, res) => {
    let findUser = await User.findOne(req.query);
    if (!findUser) {
        res.send('邮箱地址可以使用')
    } else {
        res.status(300).send('邮箱地址已被注册')
    }
})

// 输入框文字提示
app.get('/searchAutoPrompt', (req, res) => {
    // 搜索关键字
    console.log(req.query);
    const key = req.query.key;
    // 提示文字列表
    const list = [
        '黑马程序员',
        '黑马程序员官网',
        '黑马程序员顺义校区',
        '黑马程序员学院报名系统',
        '传智播客',
        '传智博客前端与移动端开发',
        '传智播客大数据',
        '传智播客python',
        '传智播客java',
        '传智播客c++',
        '传智播客怎么样'
    ];
    // 搜索结果
    let result = list.filter(item => item.includes(key));
    // 将查询结果返回给客户端
    res.send(result);
});

// 获取省份
app.get('/province', (req, res) => {
    res.json([{
        id: '001',
        name: '黑龙江省'
    }, {
        id: '002',
        name: '四川省'
    }, {
        id: '003',
        name: '河北省'
    }, {
        id: '004',
        name: '江苏省'
    }]);
});

// 根据省份id获取城市
app.get('/cities', (req, res) => {
    // 获取省份id
    const id = req.query.id;
    // 城市信息
    const cities = {
            '001': [{
                id: '300',
                name: '哈尔滨市'
            }, {
                id: '301',
                name: '齐齐哈尔市'
            }, {
                id: '302',
                name: '牡丹江市'
            }, {
                id: '303',
                name: '佳木斯市'
            }],
            '002': [{
                id: '400',
                name: '成都市'
            }, {
                id: '401',
                name: '绵阳市'
            }, {
                id: '402',
                name: '德阳市'
            }, {
                id: '403',
                name: '攀枝花市'
            }],
            '003': [{
                id: '500',
                name: '石家庄市'
            }, {
                id: '501',
                name: '唐山市'
            }, {
                id: '502',
                name: '秦皇岛市'
            }, {
                id: '503',
                name: '邯郸市'
            }],
            '004': [{
                id: '600',
                name: '常州市'
            }, {
                id: '601',
                name: '徐州市'
            }, {
                id: '602',
                name: '南京市'
            }, {
                id: '603',
                name: '淮安市'
            }]
        }
        // 响应
    res.send(cities[id]);
});

// 根据城市id获取县城
app.get('/areas', (req, res) => {
    // 获取城市id
    const id = req.query.id;
    // 县城信息
    const areas = {
        '300': [{
            id: '20',
            name: '道里区',
        }, {
            id: '21',
            name: '南岗区'
        }, {
            id: '22',
            name: '平房区',
        }, {
            id: '23',
            name: '松北区'
        }],
        '301': [{
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
            id: '32',
            name: '富拉尔基区'
        }]
    };
    // 响应
    res.send(areas[id] || []);
});

app.post('/formData', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        res.send(fields);
    })
});

// 实现文件上传的路由
app.post('/upload', (req, res) => {
    //创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    //设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname, 'public', 'uploads');
    //保留上传文件后缀名
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        res.send({
            path: files.attrName.path.split('public')[1]
        })
    })
});

app.listen(27017);

console.log('服务器启动成功');