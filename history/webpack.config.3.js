let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')

// 小插件
// 1) cleanWebpackPlugin
// 2) copyWebpackPlugin
// 3) bannerPlugin 内置  版权申明插件

module.exports = {
	mode: "production",
	entry: {
		home: "./src/index.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			}
		]
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			filename: "index.html" //但文件的时候改为index，要不找不到
		}),
		new CleanWebpackPlugin("./dist"),
		new CopyWebpackPlugin([
            { from:"doc", to:"./"} //将doc目录下内容拷贝到dist目录下
        ]),
        new webpack.BannerPlugin('make 2019 by yyccqqu')
	]
};