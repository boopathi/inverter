module.exports = {
	entry: {
		app: './index.js'
	},
	output: {
		path: './public',
		filename: '[name].bundle.js',
		libraryTarget: 'this'
	},
	externals: {
		React: 'React'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'jsx-loader?harmony'
			}
		]
	},
	noInfo: true,
	colors: true,
	watch: true
};