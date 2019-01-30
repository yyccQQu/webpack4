let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: "production",
	entry: {
		home: "./src/index.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
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
	resolve: {
        modules: [path.resolve("node_modules")],
        //https://webpack.js.org/configuration/resolve/#resolve-extensions
        extensions: ['.wasm', '.mjs', '.js', '.json','.css'],
		// mainFiles: ['index'],入口文件的名字 index.js
		mainFields: ["style", "main"], //在package包的配置中先找style，再找main
		alias: {//别名
            bootstrapCss: "bootstrap/dist/css/bootstrap.css",
		}
	},
	devServer: {
		// 3) 有服务端 不用代理处理,
		//    前端和服务端启动在一个端口上
		//    在服务端启动webpack， 端口用服务端端口
		// 2）单纯模拟数据
		// before(app) {
		//     app.get("/api/user", (req, res) => {
		// 		res.json({ name: "yyccqqu1" });
		// 	});
		// }
		//
		// 1）
		// proxy: {
		// 	"/api": {
		// 		target: "http://localhost:3000",
		// 		pathRewrite: {'/api':''}
		// 	}
		// }
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			filename: "index.html" //但文件的时候改为index，要不找不到
		})
	]
};