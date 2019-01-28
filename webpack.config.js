let path = require("path")

module.exports = {
    devServer: {
        // 开发服务器配置 webpack-dev-server
        // 起服务构建的时候需要html文件，否则不会显示页面，只会显示路径
        port: 3000,
        progress: true,
        contentBase: './build'
    },

    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js", //打包后的文件名
        path: path.resolve(__dirname, "./build") // 路径必须是一个绝对路径
    }
};

