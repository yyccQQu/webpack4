class AsyncSeriesHook { //同步钩子 
    constructor(args){ // args => ['name]
        this.tasks = []
        console.log(args,'args')
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let finalCallBack = args.pop()
        console.log(finalCallBack, "finalCallBack");
        let index = 0;
        let next = () => {
            if (this.tasks.length === index) return finalCallBack()
            let task = this.tasks[index++];
            task(...args,next);
        }
        next()
    }
}

let hook = new AsyncSeriesHook(["name", "age"]);
let total = 0
//延迟一秒只是为了验证函数是异步执行的
hook.tapAsync('react', function(name, cb) {
    setTimeout(() => {
        console.log("react", name);
        cb();
    }, 1000)
})
hook.tapAsync('node', function (name, cb) {
    setTimeout(() => {
        console.log("node", name);
        cb();
    }, 1000);
})

hook.callAsync(["yyccqqu", "aaa"],function() {
	console.log("end");
});

// ['name', 'age'] 'args'
// react['yyccqqu', 'aaa']
// node['yyccqqu', 'aaa']
// end
