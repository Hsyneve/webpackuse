module.exports = {
   devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
       {
        test: /\.css$/,
        loader: 'style!css'//添加对样式表的处理
      }
    ]
  },
  resolve: {
  alias: {
    'vue$': 'vue/dist/vue.common.js'
  }
}

}