
// import $ from 'expose-loader?$!jquery'
// expose-loader 暴露 全局的loader 内联的loader
// import $ from "jquery";
// console.log($,'///',window.$)

//直接取 jquery
console.log($)

// 全局变量引入
// 1) expose-loader 暴露到window上
// 2） providePlugin 给每个人提供一个 $
// 3)  引入不打包的方式
//