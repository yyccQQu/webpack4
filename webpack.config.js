let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	devServer: {
		// 开发服务器配置 webpack-dev-server
		// 起服务构建的时候需要html文件，否则不会显示页面，只会显示路径
		port: 3000,
		progress: true,
		contentBase: "./build"
	},

	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js", //打包后的文件名
		path: path.resolve(__dirname, "./build") // 路径必须是一个绝对路径
	},

	plugins: [
		// 所有webpack 插件
		new HtmlWebpackPlugin({
			template: "./src/index.html", //模板
			filename: "index.html", //文件名
			hash: true,
			minify: {
				// 压缩
				removeAttributeQuotes: true, //删除属性双引号
				collapseWhitespace: true //折叠为一行
			}
		})
	],
	module: {
		rules: [
			// 规则 css-loader 解析 @import语法
			{
				test: /.css$/,
				// 多个loader 需要 [],从右向左执行
				use: [
                    // loader 变为对象之后可以多传参数
                    { loader: "style-loader" }, 
                    "css-loader"
                ]
			}
		]
	}
};
