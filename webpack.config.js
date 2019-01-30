let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
    },
    module:{
        noParse:/jquery/, //不去解析jquery中的依赖关系
        rules:[
            {
                test:/\.js$/,
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
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		}),
		new CleanWebpackPlugin("./dist")
	]
};