var webpack = require('webpack');

module.exports = {
	entry: {
		app: './index.js',
		vendor: ['react'],
	},
	output: {
		path: './public',
		filename: '[name].bundle.js',
		libraryTarget: 'this'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'jsx-loader?harmony'
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
	],
	noInfo: true,
	colors: true
};