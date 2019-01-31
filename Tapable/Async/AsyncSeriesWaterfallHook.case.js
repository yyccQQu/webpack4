class AsyncSeriesWaterfallHook { //异步串行 
    constructor(args){ // args => ['name]
        this.tasks = []
        console.log(args,'args')
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let index = 0;
        let finalCallBack = args.pop()
        //异步迭代
        let next = (err,data) => {
            let task = this.tasks[index];
            if (!task) return finalCallBack()
            if(index==0){
                task(...args,next)
            }else{
                task(data,next);
            }
            index++
        }
        next()
    }
}
// 异步串行
let hook = new AsyncSeriesWaterfallHook(["name", "age"]);
let total = 0
//延迟一秒只是为了验证函数是异步执行的
hook.tapAsync('react', function(name,cb) {
    // return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("react", name);
            cb(null,'结果1');
        }, 1000)
    // })
})
hook.tapAsync('node', function (name,cb) {
    // return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("node", name);
            cb(null, '结果2');
        }, 1000)
    // })
})

hook.callAsync(["yyccqqu", "aaa"],function() {
	console.log("end");
});


// ['name', 'age'] 'args'
// react['yyccqqu', 'aaa']
// node 结果1
// end
