const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {

    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        //file-loader默认路径为根目录，需要在每张图片前添加路径dist/
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      }
    },
    module: {
        rules: [
            
        //cssloader
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },

        //url-loader 吧小于8192字节的图片转换为base64编码
        //大于8192字节的图片使用file-loader打包到dist目录下  路径根据output的path路径
        {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            ]
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test:/\.vue$/,
            use:['vue-loader']
          }
        ]
    },
    plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}