const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const conf = require('../config')
const { resolve, join } = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


const config = merge(base, {
	entry: {
		'app': ['./src/pages/index/client-entry.js'],
    'manage': ['./src/pages/admin/admin.js']
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
		// strip dev-only code in Vue source
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"client"'
		}),
		// new VueSSRClientPlugin({chunks: ['manifest','vendor','app']}),
    new HtmlWebpackPlugin({
      filename: resolve(__dirname,'../public/dist/app.html'),
      template: 'src/pages/index/index.html',
      // inject: true,
      minify: {
        // removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: 'dependency',
      chunks: ['manifest_app','vendor_app','app']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor_app',
      chunks: ['app'],
      minChunks: function(module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest_app',
      chunks: ['vendor_app']
    }),
    new HtmlWebpackPlugin({
      filename: resolve(__dirname,'../public/dist/manage.html'),
      template: 'src/pages/admin/admin.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: 'dependency',
      chunks: ['manifest_manage','vendor_manage','manage']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor_manage',
      chunks: ['manage'],
      minChunks: function(module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest_manage',
      chunks: ['vendor_manage']
    })
  ],
})

config.entry['app'].unshift('webpack-hot-middleware/client?reload=true')
config.entry['manage'].unshift('webpack-hot-middleware/client?reload=true')

if(process.env.NODE_ENV === 'production'){
  config.entry['app'].shift();
  config.entry['manage'].shift();
  
  config.plugins.push(new BundleAnalyzerPlugin({
    
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8888,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'warn'
  }))
  // 删除devtool
  delete config.devtool;
  if (conf.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    
    config.plugins.push(
      new OfflinePlugin(),
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          conf.build.productionGzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }
  config.plugins = config.plugins.concat([
    new UglifyJsPlugin({
      // 使用外部引入的新版本的js压缩工具
      parallel: true,
      uglifyOptions: {
        ie8: false,
        ecma: 6,
        warnings: false,
        mangle: true,
        output: {
          comments: false,
          beautify: false,
        },
        compress: {
// 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
// 删除所有的 `console` 语句
// 还可以兼容ie浏览器
          drop_console:true,
// 内嵌定义了但是只用到一次的变量
          collapse_vars:true,
// 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars:true,
        }
      }
    })
  ]);
}

module.exports = config
