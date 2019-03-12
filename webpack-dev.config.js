const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/app-client.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app-client.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      io: 'socket.io-client'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    watchContentBase: true,
    proxy: [
      {
        context: ['/api', '/auth'],
        target: 'http://localhost:3000',
        secure: false,
      },
    ],
    port: 3030
  }
};