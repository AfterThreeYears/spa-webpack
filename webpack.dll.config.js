const path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const vendors = ['vue'];

module.exports = {
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		vendors,
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name]_[hash].js",
		library: "[name]_[hash]"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "dist", "[name]-manifest.json"),
			name: "[name]_[hash]"
		}),
		new CleanWebpackPlugin(path.join(__dirname, 'dist')),
	]
};