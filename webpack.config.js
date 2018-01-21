const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['es2015'],
      plugins: [
        ['transform-class-properties'],
        ['transform-react-jsx', { pragma: 'h' }]
      ]
    }
  }
}

module.exports = {
  entry: {
    'vendor.js': ['preact'],
    'index.js': path.resolve(__dirname, 'src/client/pages'),
  },
  module: {
    rules: [js]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor.js']
    }),
    new ExtractTextPlugin('[name]')
  ],
  output: {
    path: path.resolve('src/server'),
    filename: 'public/js/[name]'
  }
}