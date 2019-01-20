const path = require('path')
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: {
    index: path.resolve(__dirname, './src/', "index.js")
  },
  output: {
    path: path.resolve(__dirname, process.env.WEBPACK_SERVE ? './dist' : './docs'),
    filename: process.env.WEBPACK_SERVE ? '[name]-[hash].js' : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: !!process.env.WEBPACK_SERVE,
              importLoaders: 2
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: !!process.env.WEBPACK_SERVE,
            }
          }
        ],
      },
      {
        test: /\.jsx?$/,
        exclude:[ /node_modules/ ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ["style-loader", { loader: "css-loader", options: { url: false, modules: true } }]
      }]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, "/docs"),
    watchContentBase: true,
    open:true,
    disableHostCheck: true
  },
  plugins: [
    new UnusedFilesWebpackPlugin({patterns: ['src/**/*.js']})
  ]
}
