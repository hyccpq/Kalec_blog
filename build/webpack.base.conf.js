'use strict'
const path = require('path')
const glob = require('glob')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const PriuifyCSSPPlugin = require('purifycss-webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const plugin = new ExtractTextWebpackPlugin({
      filename: utils.assetsPath('css/[name].css'),
      allChunks: true,
    })


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders:{
                css: ExtractTextWebpackPlugin.extract({
                  use: 'css-loader!stylus-loader',
                  fallback: 'vue-style-loader'
                }),
                stylus: ExtractTextWebpackPlugin.extract({
                  use: 'css-loader!stylus-loader',
                  fallback: 'vue-style-loader'
                }),
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/vue2-hammer'), resolve('node_modules/iview/src'), resolve('node_modules/iview/packages')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use:[
            {
              loader: 'css-loader!postcss-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    plugin,
    // new PriuifyCSSPPlugin({
    //   paths: glob.sync(resolve(__dirname,'src/pages/*.html'))
    // }),
    // new BundleAnalyzerPlugin({
    //   // Can be `server`, `static` or `disabled`.
    //   // In `server` mode analyzer will start HTTP server to show bundle report.
    //   // In `static` mode single HTML file with bundle report will be generated.
    //   // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
    //   analyzerMode: 'server',
    //   // Host that will be used in `server` mode to start HTTP server.
    //   analyzerHost: '127.0.0.1',
    //   // Port that will be used in `server` mode to start HTTP server.
    //   analyzerPort: 8888,
    //   // Path to bundle report file that will be generated in `static` mode.
    //   // Relative to bundles output directory.
    //   reportFilename: 'report.html',
    //   // Module sizes to show in report by default.
    //   // Should be one of `stat`, `parsed` or `gzip`.
    //   // See "Definitions" section for more information.
    //   defaultSizes: 'parsed',
    //   // Automatically open report in default browser
    //   openAnalyzer: true,
    //   // If `true`, Webpack Stats JSON file will be generated in bundles output directory
    //   generateStatsFile: false,
    //   // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
    //   // Relative to bundles output directory.
    //   statsFilename: 'stats.json',
    //   // Options for `stats.toJson()` method.
    //   // For example you can exclude sources of your modules from stats file with `source: false` option.
    //   // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
    //   statsOptions: null,
    //   // Log level. Can be 'info', 'warn', 'error' or 'silent'.
    //   logLevel: 'info'
    // })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
