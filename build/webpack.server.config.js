const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const isProd = process.env.NODE_ENV === 'production'
// base.module.rules[1].options = ''
module.exports = merge(base, {
	target: 'node',
	devtool: isProd?false:'#source-map',
	entry: './src/pages/index/server-entry.js',
	output: {
		filename: `server.[hash:8].js`,
		libraryTarget: 'commonjs2'
	},
  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    whitelist: [/\.css$/,/iview/,/node_modules/]
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
