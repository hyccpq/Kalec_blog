'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const { resolve, join } = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prod = process.env.NODE_ENV === 'production';

const config = merge(base, {
	mode: prod ? 'production' : 'development',
    devtool: prod ? false : '#cheap-module-eval-source-map',
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
							loaders:{
								css: [
									prod ? MiniCssExtractPlugin.loader :'vue-style-loader',
									'happypack/loader?id=css'
								],
								stylus: [
									prod ? MiniCssExtractPlugin.loader :'vue-style-loader',
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
					prod ? MiniCssExtractPlugin.loader :'vue-style-loader',
					'happypack/loader?id=css'
				]
			},
			{
				test: /\.styl(us)?$/,
				use: [
					prod ? MiniCssExtractPlugin.loader :'vue-style-loader',
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
		manage: [ resolve(__dirname, '../../front/pages/admin/admin.js') ]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
		// strip dev-only code in Vue source
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"client"'
		}),
		new HtmlWebpackPlugin({
			filename: resolve(__dirname, '../ejs/manage.ejs'),
			template: resolve(__dirname,'../../front/pages/admin/admin.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency',
			chunks: [ 'manifest', 'vendor', 'common', 'manage' ]
		})
	]
});

config.entry['manage'].unshift('webpack-hot-middleware/client?reload=true');

if (prod) {
	config.entry['manage'].shift();

	config.plugins.push(
		new MiniCssExtractPlugin({
			filename: '[name].[hash:8].css',
			// chunkFilename: '[id].[hash:8].css'
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: join(__dirname, '../../public/dist/report-' + Date.now() + '.html'),
			defaultSizes: 'parsed',
			openAnalyzer: true,
			generateStatsFile: false,
			statsFilename: 'stats.json',
			statsOptions: null,
			logLevel: 'warn'
		})
	);
	// 删除devtool
	delete config.devtool;
	
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
					beautify: false
				},
				compress: {
					// 在UglifyJs删除没有用到的代码时不输出警告
					warnings: false,
					// 删除所有的 `console` 语句
					// 还可以兼容ie浏览器
					drop_console: true,
					// 内嵌定义了但是只用到一次的变量
					collapse_vars: true,
					// 提取出出现多次但是没有定义成变量去引用的静态值
					reduce_vars: true
				}
			}
		})
	]);
}

module.exports = config;