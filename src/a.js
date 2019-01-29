console.log("a.js")
class B{
    
}

function * gen(params) {
    yield 1;
}
console.log(gen().next())