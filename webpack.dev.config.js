const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'development',
  bail: false,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    process.env.NODE_ENV === 'analyze' && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: './src',
    port: 3000,
    compress: true,
    historyApiFallback: true,
  },
}
