let path = require('path')


module.exports = {
	mode: "development",
	entry: {
		test: "./src/test.js"
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		//将结果存到一个名为ab的变量上并导出 var ab =
		library: "ab",
		// libraryTarget为commonjs时 将结果用“exports”导出  exports["ab"] =
		//参数还可为'umd'/'commonjs'
		libraryTarget: "var"
	}
};



