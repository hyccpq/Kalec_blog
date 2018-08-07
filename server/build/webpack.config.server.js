'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const { resolve, join } = require('path');

const prod = process.env.NODE_ENV === 'production';

module.exports = merge(base, {
	mode: prod ? 'production' : 'development',
	target: 'node',
	devtool: prod ? false : 'source-map',
	entry:  resolve(__dirname, '../../front/pages/index/server-entry.js'),
	output: {
		filename: `server-entry.js`,
		libraryTarget: 'commonjs2',
		path: join(__dirname, '../server-build')
	},
	externals: Object.keys(require('../../package.json').dependencies),
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"server"'
		}),
		new VueSSRServerPlugin({
			filename: 'vue-ssr-server-bundle.json'
		})
	]
});
