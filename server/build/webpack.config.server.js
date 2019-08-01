'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const QiniuUploadPlugin = require('qiniu-upload-plugin');


const prod = process.env.NODE_ENV === 'production';

class ServerMiniCssExtractPlugin extends MiniCssExtractPlugin {
	getCssChunkObject(mainChunk) {
		return {};
	}
}


let baseConf= merge(base, {
	mode: prod ? 'production' : 'development',
	target: 'node',
	devtool: prod ? false : 'source-map',
	entry:  resolve(__dirname, '../../front/pages/index/server-entry.js'),
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
									prod ? ServerMiniCssExtractPlugin.loader :'vue-style-loader',
									'happypack/loader?id=css'
								],
								stylus: [
									prod ? ServerMiniCssExtractPlugin.loader :'vue-style-loader',
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
					prod ? ServerMiniCssExtractPlugin.loader :
					'vue-style-loader',
					'happypack/loader?id=css'
				]
			},
			{
				test: /\.styl(us)?$/,
				use: [
					prod ? ServerMiniCssExtractPlugin.loader :
					'vue-style-loader',
					'happypack/loader?id=stylus'
				],
				exclude: [resolve(__dirname, '../../node_modules')]
			}
		]
	},
	output: {
		filename: `server-entry.js`,
		libraryTarget: 'commonjs2',
		path: join(__dirname, '../server-build'),
		publicPath: '/'
	},
	externals: Object.keys(require('../../package.json').dependencies),
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"server"'
		}),
		new VueSSRServerPlugin({
			filename: 'vue-ssr-server-bundle.json'
		}),
	]
});

if(prod) {
	baseConf.plugins.push(
		new ServerMiniCssExtractPlugin({
			filename: '[name].[hash:8].css',
			chunkFilename: '[id].[hash:8].css'
		}),
		 new QiniuUploadPlugin({
            publicPath: 'https://static.kalecgos.top/',
            accessKey: qiniu.AK,
            secretKey: qiniu.SK,
            bucket: 'static',
            zone: 'Zone_z0',
            cover: true
        }),
	)
}

module.exports = baseConf
