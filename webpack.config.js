var webpack = require('webpack');

module.exports = {
  
  entry: [
    './client/src/index.jsx',
  ],
  module: {
  
    loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname + '/client/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/dist',
    port: process.env.PORT || 9000
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin()
  ]
};