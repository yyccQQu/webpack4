import { AST_Await } from "terser";
require('@babel/polyfill')

console.log("a.js")
class B{
    
}

// "@babel/runtime" -S
function * gen(params) {
    yield 1;
}
console.log(gen().next())

//babel/polyfill S
'aaa'.includes('a');