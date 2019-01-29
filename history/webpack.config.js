let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	devServer: {
		port: 3000,
		progress: true,
		contentBase: "./build"
	},

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
		})
	]
};
