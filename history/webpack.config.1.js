let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "production",
    // 多入口
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
    devtool: "source-map",
    // 'eval-source-map' //可以反映出错行列，但是不会生成map文件
    // 'cheap-module-source-map' //不可以反映出错行列，但是会生成map文件，不会和代码关联起来,一个单独的映射文件
    // 'cheap-module-eval-source-map' //不会生成map文件，不会产生列，集成在打包后的文件中
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html" //但文件的时候改为index，要不找不到
        })
    ]
};