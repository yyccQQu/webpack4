console.log(1)
let str = require('./a.js')
require('./index.css')
require('./index.less')

let fn = ()=> {
    console.log(12345)
}
fn();


// proposal-class-properties
@log
class A{
    a = 16666
}

let a = new A()
console.log(a.a);
function log(target) {
	console.log(target, 23);
}


