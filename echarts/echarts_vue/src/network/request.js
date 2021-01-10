import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000/api',
        timeout: '5000',
        withCredentials: false, //关闭cookie
        // changeOrigin: true,   //cli开启代理 解决跨域
    })
    instance.interceptors.request.use(config => {
        config.withCredentials = true
        return config
    }, err => {
        console.log(err);
    })


    //响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })
    return instance(config)
}