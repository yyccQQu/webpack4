let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require("clean-webpack-plugin");
let webpack = require('webpack')


module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    module:{
        noParse:/jquery/, //不去解析jquery中的依赖关系
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                include: path.resolve('src'),
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
	plugins: [
        //引用 动态链接库（_dll_react.js）的插件
        //寻找任务清单
        // 如果找不到，再去打包那些import的文件
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname,'dist','mainfest.json')
        }),
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		}),
		// new CleanWebpackPlugin("./dist")
	]
};