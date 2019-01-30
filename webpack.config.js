let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require("clean-webpack-plugin");
let webpack = require('webpack')


module.exports = {
    mode: "production",
    optimization:{
        splitChunks:{ // 分割代码块
            cacheGroups:{ // 缓存组
                common: { //公共模块
                    chunks: 'initial',
                    minSize: 0, //最少有0个字节公用
                    minChunks: 2, //至少公用2次以上
                },
                //第三方抽离
                vendor:{
                    priority: 1, //最先抽离
                    test: /node_modules/, //把node_modules内被引用的文件抽离出来
                    chunks: 'initial',
                    minSize: 0, //最少有0个字节公用
                    minChunks: 2, //至少公用2次以上
                }
            }
        }

    },
	entry: {
        index: './src/index.js',
        other: './src/other.js'
    },
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist")
	},
	devServer: {
		port: 3000,
		open: true,
		contentBase: "./dist"
	},
	module: {
		noParse: /jquery/, //不去解析jquery中的依赖关系
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.resolve("src"),
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				}
			},
			{
				test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
			}
		]
	},
	plugins: [
		
		new webpack.IgnorePlugin(/\.\/locale/, /moment/),
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		}),
		new CleanWebpackPlugin("./dist"),
		
	]
};