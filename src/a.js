require('@babel/polyfill')

console.log("a.js")
class B {

}

// "@babel/runtime" -S
function* gen(params) {
    yield 1;
}
console.log(gen().next())

//babelpolyfill S
'aaa'.includes('a');