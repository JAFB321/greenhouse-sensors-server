module.exports = {
	entry: './src/client/index.js',
	output: {
		path: __dirname + '/src/public',
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// // Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		],
	},
	devServer: {
		port: 8080,
		open: true,
		historyApiFallback: true,
		hot: true,
		proxy: {
			'/': 'http://localhost:3000',
		},
	},
};
