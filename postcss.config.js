module.exports = {
	plugin: [
		require('autoprefixer')({ browsers: ['>10%'] }),
		require('cssnano')
	]
}
