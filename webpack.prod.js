
let {smart} = require('webpack-merge');
let base = require("./webpack.base.js");
let CleanWebpackPlugin = require("clean-webpack-plugin");

let webpack = require("webpack");


const mode = "production";
const modes = JSON.stringify(mode);

module.exports = smart(base, {
	mode: mode,
	devServer: {
		port: 3001,
		progress: true,
		contentBase: "./dist"
	},
	devtool: "cheap-module-source-map",
	optimization: {
		minimizer: []
	},
	plugins: [
		new webpack.DefinePlugin({
            DEV: modes,
			FLAG: "true",
			EXPRESSION: "1+1"
        }),
        new CleanWebpackPlugin("./dist"),
	]
});

