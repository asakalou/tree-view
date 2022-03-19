module.exports = ({ env }) => ({
  plugins: [
    require('postcss-preset-env')({
      stage: 0,
    }),
    require('autoprefixer'),
    env === 'production'
      ? require('cssnano')({ preset: 'default' })
      : undefined,
  ],
})
