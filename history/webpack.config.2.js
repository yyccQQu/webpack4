let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: "production",
	// 多入口
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
    watch: true,
    watchOptions: {
        poll: 1000, // 每秒监控
        aggregateTimeout: 500, //防抖 ，0.5秒内有变化就延时编译
        ignored: /node_modules/ //忽略文件
    },
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			filename: "index.html" //但文件的时候改为index，要不找不到
		})
	]
};