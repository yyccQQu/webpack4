let path = require('path')
let webpack = require("webpack");



module.exports = {
    mode: "development",
    //动态链接库的生成
	entry: {
		react: ['react','react-dom'],
	},
	output: {
		filename: "_dll_[name].js", //产生的文件名
		path: path.resolve(__dirname, "dist"),
		//将结果存到一个名为ab的变量上并导出 var ab =
        // library: "ab",
        
		// libraryTarget为commonjs时 将结果用“exports”导出  exports["ab"] =
		//参数还可为'umd'/'commonjs'
        // libraryTarget: "var"
        library: '_dll_[name]', // _dll_react
    },
    plugins:[
        //将包名及链接导入到 mainfest.json 中
        new webpack.DllPlugin({
            name: '_dll_[name]', //与上面的配置同名
            path: path.resolve(__dirname,'dist','mainfest.json')
        })
    ]

};



