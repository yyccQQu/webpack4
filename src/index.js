// import calc from './test';
// import 在生产环境下 会自动去除掉没用的代码
// tree-shaking 把没用到的代码 自动删除掉

// es6 模块会把结果放到default上
// let calc = require('./test')
// require 不支持 tree-shaking.即会把所有的引入文件打包，无论是否用到

// 生产环境下 scope hosting 作用域提升
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c; // 在webpack中 自动省略可以简化的代码
console.log(d,'---->sss')

console.log(calc.default.sum(1,2));