let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "./build")
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			hash: true,
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true
			}
		}),
		//把公用的css抽用成一个css文件
		new MiniCssExtractPlugin({
			filename: "main.css"
		})
	],
	module: {
		rules: [
			{
				test: /.css$/,
				use: [
					MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader", //autoprefixer 自动加上浏览器前缀
                    
				]
			},
			{
				test: /.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
                    "less-loader",
					"postcss-loader",
                    
				]
			}
		]
	}
};
