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
    devServer:{
        proxy:{
            //访问 /api 就相当于 访问 后面的地址了
            '/api': 'http://localhost:3000' 
        }
    },
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			filename: "index.html" //但文件的时候改为index，要不找不到
		}),
		
	]
};