
let { smart } = require('webpack-merge');
let base = require('./webpack.base.js');
let HtmlWebpackPlugin = require("html-webpack-plugin");

let webpack = require('webpack');

const mode = "development";
const modes = JSON.stringify(mode);

module.exports = smart(base, {
    mode: mode,
	devServer: {
		port: 3000,
		progress: true,
		contentBase: "./dist"
	},
	devtool: "source-map",

	plugins: [
		new webpack.DefinePlugin({
            DEV: modes,
			FLAG: "true",
			EXPRESSION: "1+1"
		})
	]
});

