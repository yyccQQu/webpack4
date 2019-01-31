class AsyncSeriesHook { //异步串行 
    constructor(args){ // args => ['name]
        this.tasks = []
        console.log(args,'args')
    }
    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        let [first,...others] = this.tasks;
        return others.reduce((p, n) => { //redux源码
            console.log(p,n,'nnnn')
			return p.then(() => n(...args));
		}, first(...args));
    }
}
// 异步串行
let hook = new AsyncSeriesHook(["name", "age"]);
let total = 0
//延迟一秒只是为了验证函数是异步执行的
hook.tapPromise('react', function(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("react", name);
            resolve();
        }, 1000)
    })
})
hook.tapPromise('node', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("node", name);
            resolve();
        }, 1000)
    })
})
hook.tapPromise("webpack", function(name) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
            console.log("webpack", name);
			resolve();
		}, 1000);
	});
});

hook.promise(["yyccqqu", "aaa"]).then(function() {
	console.log("end");
});

// [ 'name', 'age' ] 'args'
// Promise { <pending> } [Function] 'nnnn'
// Promise { <pending> } [Function] 'nnnn'
// react [ 'yyccqqu', 'aaa' ]
// node [ 'yyccqqu', 'aaa' ]
// webpack [ 'yyccqqu', 'aaa' ]
// end
