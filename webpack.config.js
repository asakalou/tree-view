const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const prodConfig = require('./webpack.prod.config')
const devConfig = require('./webpack.dev.config')

const isProduction = process.env.NODE_ENV === 'production'
const webpackConfig = isProduction ? prodConfig : devConfig

module.exports = {
  mode: webpackConfig.mode,
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
  devServer: webpackConfig.devServer,
}
