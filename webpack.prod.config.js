const webpack = require('webpack')
const pkg = require('./package.json')

module.exports = {
    mode: 'production',
    bail: true,
    plugins: [
        new webpack.BannerPlugin({
            banner: `${pkg.name}@${pkg.version} ${new Date}`,
        }),
    ]
}
