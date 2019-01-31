class AsyncParallelHook { //异步钩子 bail保险
    constructor(args){ // args => ['name]
        this.tasks = []
        console.log(args,'args')
    }
    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        let tasks = this.tasks.map(task => task(...args));
        return Promise.all(tasks);
    }
}

let hook = new AsyncParallelHook(["name", "age"]);
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
		}, 1000);
	});
})

hook.promise(["yyccqqu", "aaa"]).then(function(){
    console.log('end')
})

// ['name', 'age'] 'args'
// [['yyccqqu', 'aaa']] 'argsdd'
// react['yyccqqu', 'aaa']
// node['yyccqqu', 'aaa']
// end