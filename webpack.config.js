/*
 * @Description: webpack 配置
 * @Autor: zhy
 * @Date: 2022-03-15 13:42:57
 * @LastEditors: zhy
 * @LastEditTime: 2022-03-15 15:01:10
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量

const config = {
 /*  mode: 'development', */ // 模式
  entry: './src/index.js', // 打包入口地址
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.join(__dirname, 'dist') // 输出文件目录
  },
  module: { 
    rules: [ // 转换规则
      {
        test: /\.css$/, //匹配所有的 css 文件
        use: ['style-loader','css-loader'] // use: 对应的 Loader 名称
      }
    ]
  },
  /* 配置插件 */
  /* 和loader的不同：与 Loader 用于转换特定类型的文件不同，插件（Plugin）可以贯穿 Webpack 打包的生命周期，执行不同的任务 */
  plugins: [
    /* 引入js和css */
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    /* 自动清空打包目录 */
    new CleanWebpackPlugin()
  ],
  /* 配置本地服务 */
  devServer: {
    static: {
       directory: path.join(__dirname, 'public'),
    }, // 静态文件目录
    compress: true, //是否启动压缩 gzip
    port: 8080, // 端口号
    // open:true  // 是否自动打开浏览器
  },

}
module.exports = (env, argv) => { 
  console.log('argv.mode=',argv.mode) // 打印 mode(模式) 值
  // 这里可以通过不同的模式修改 config 配置
  return config;
}
