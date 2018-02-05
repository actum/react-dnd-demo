const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');

const path = require('path');
const srcPath = `${__dirname}/dist`;

module.exports = {
  entry: [
    './client/src/app/index.js',
  ],
  resolveLoader: {
    modules: ["node_modules"],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"]
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["env", "react", "es2015"]
        }
      },
      {
        test: /\.(s*)css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: srcPath,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: srcPath,
    port: process.env.PORT || 9000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("css/styles.css"),
    new WriteFilePlugin()
  ]
};
