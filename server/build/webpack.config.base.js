'use strict';
const path = require('path');
// const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });

const prod = process.env.NODE_ENV === 'production';

function resolve(dir) {
	return path.join(__dirname, '../../front', dir);
}

let conf = {
	context: path.resolve(__dirname, '../'),
	resolve: {
		extensions: [ '.js', '.vue', '.json' ],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': resolve('/')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'happypack/loader?id=vue'
					}
					// {
					// 	loader: 'vue-loader',
					// 	options: {
					// 		loaders: {
                    //             css: [
                    //                 prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    //                 'happypack/loader?id=css'
                    //             ],
                    //             stylus: [
                    //                 prod ? MiniCssExtractPlugin.loader: 'style-loader',
                    //                 'happypack/loader?id=stylus'
                    //             ]
					// 		}
					// 	}
					// }
				]
			},
			{
				test: /iview\/.*?js$/,
				loader: 'happypack/loader?id=babel'
			},
			{
				test: /\.js$/,
				loader: 'happypack/loader?id=babel',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
					name: 'img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
					name: 'media/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.css$/,
				use: [
					!prod ? 'style-loader' : MiniCssExtractPlugin.loader,
					'happypack/loader?id=css'
				]
			},
			{
				test: /\.styl(us)?$/,
				use: [
					!prod ? 'style-loader' : MiniCssExtractPlugin.loader,
					'happypack/loader?id=stylus'
				],
				exclude: [path.resolve(__dirname, '../../node_modules')]
			}
		]
	},
	plugins: [
        new HappyPack({
			// 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
			id: 'babel',
			// 如何处理 .js 文件，用法和 Loader 配置中一样
			loaders: [ 'babel-loader?cacheDirectory' ],
			// 使用共享进程池中的子进程去处理任务
			threadPool: happyThreadPool
		}),
		new HappyPack({
            id: 'vue',
			loaders: ['vue-loader'],
			threadPool: happyThreadPool
        }),
		new HappyPack({
			id: 'stylus',
			// 如何处理 .css 文件，用法和 Loader 配置中一样
			loaders: [
				'css-loader',
				'postcss-loader',
				'stylus-loader',
			],
			// 使用共享进程池中的子进程去处理任务
			threadPool: happyThreadPool
		}),
		new HappyPack({
			id: 'css',
			// 如何处理 .css 文件，用法和 Loader 配置中一样
			loaders: [
				'css-loader',
				'postcss-loader'
			],
			// 使用共享进程池中的子进程去处理任务
			threadPool: happyThreadPool
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash:8].css',
			chunkFilename: '[id].[hash:8].css'
		})
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
};



module.exports = conf;
