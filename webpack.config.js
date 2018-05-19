
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.MODE || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html' //relative to root of the application
    })
  ],

  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }

};