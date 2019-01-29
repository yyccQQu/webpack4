let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
let UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
let webpack = require('webpack')


module.exports = {
	optimization: {
		minimizer: [
			new UglifyjsWebpackPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCssAssetsWebpackPlugin()
		]
	},
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "build")
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
		}),
		new webpack.ProvidePlugin({
            $: "jquery" //在每个模块中注入$
		})
    ],
    // externals:{
    //     jquery: "$" //第三方模块儿，不用打包
    // },
	module: {
		// loader 默认 从右向左 从下到上
		rules: [
			// {
			//     test: require.resolve('jquery'),
			//     use: 'expose-loader?$' //内联loader
			// },
			//http://eslint.cn/demo/
			// {
			// 	test: /\.js$/,
			// 	use: {
			// 		loader: "eslint-loader",
			// 		options: {
			// 			enforce: "pre" //previous前面 post后面
			// 		}
			// 	}
			// },
			{
				test: /\.js$/, //normal
				use: {
					loader: "babel-loader",
					options: {
						// 用babel-loader 需要把es6转为es5
						presets: ["@babel/preset-env"],
						plugins: [
							// 装饰器
							[
								"@babel/plugin-proposal-decorators",
								{ legacy: true }
							],
							// class A
							[
								"@babel/plugin-proposal-class-properties",
								{ loose: true }
							],
							"@babel/plugin-transform-runtime"
						]
					}
				},
				include: path.resolve(__dirname, "src"),
				exclude: /node_modules/
			},
			{
				test: /.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader" //autoprefixer 自动加上浏览器前缀
				]
			},
			{
				test: /.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"less-loader",
					"postcss-loader"
				]
			}
		]
	}
};
