'use strict'
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const base = require('./webpack.config.base.cjs')
const { resolve, join } = require('path')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const QiniuUploadPlugin = require('qiniu-upload-plugin')
const { qiniu } = require('../conf/qiniu')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prod = process.env.NODE_ENV === 'production'

const config = merge(base, {
  mode: prod ? 'production' : 'development',
  devtool: prod ? false : 'source-map',
  output: {
    path: resolve(__dirname, '../../public/dist'),
    filename: '[name].[hash:6].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                css: [
                  prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                  'happypack/loader?id=css'
                ],
                stylus: [
                  prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                  'happypack/loader?id=stylus'
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'happypack/loader?id=css'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'happypack/loader?id=stylus'
        ],
        exclude: [resolve(__dirname, '../../node_modules')]
      }
    ]
  },
  optimization: {
    //包清单
    runtimeChunk: {
      name: 'manifest'
    },
    //拆分公共包
    splitChunks: {
      cacheGroups: {
        //项目公共组件
        common: {
          chunks: 'initial',
          name: 'common',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },

        //第三方组件
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  entry: {
    manage: [resolve(__dirname, '../../front/pages/admin/admin.js')]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.VUE_ENV': '"client"'
    }),
    new HtmlWebpackPlugin({
      filename: 'manage.html',
      // filename: prod ? resolve(__dirname, '../ejs/manage.ejs') : ,
      template: resolve(__dirname, '../../front/pages/admin/admin.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest', 'vendor', 'common', 'manage']
    })
  ]
})

// config.entry['manage'].unshift('webpack-hot-middleware/client?reload=true');

if (prod) {
  // config.entry['manage'].shift();
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].manage.[hash:8].css'
      // chunkFilename: '[id].[hash:8].css'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: join(
        __dirname,
        '../../public/dist/report-' + Date.now() + '.html'
      ),
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'warn'
    })
  )
  // 删除devtool
  delete config.devtool

  config.plugins = config.plugins.concat([
    new QiniuUploadPlugin({
      publicPath: 'https://static.kalecgos.top/',
      accessKey: qiniu.AK,
      secretKey: qiniu.SK,
      bucket: 'static',
      zone: 'Zone_z0',
      cover: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            },
            normalizeUnicode: false
          }
        ]
      },
      canPrint: true
    })
  ])

  config.optimization.minimizer = [
    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
      // 等等详细配置见官网
    })
  ]
}

module.exports = config
