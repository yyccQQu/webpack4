class SyncWaterfallHook { //同步钩子 bail保险
    constructor(args){ // args => ['name]
        this.tasks = []
        console.log(args,'args')
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        let [first,...others] = this.tasks;
        let ret = first(...args);
        others.reduce((a,b)=>{ //等第一个函数执行完了之后再接着执行
            return b(a);
        }, ret)
    }
}

let hook = new SyncWaterfallHook(["name", "age"]);

hook.tap('react', function(name) {
    console.log('react',name)
    return 'react ok'
})
hook.tap('node', function (data) {
    console.log("node", data);
    return "node ok";
})
hook.tap("webpack", function(data) {
    console.log("webpack", data);
	// return "node ok";
});
hook.call(['yyccqqu','aaa'])

// ['name', 'age'] 'args'
// react['yyccqqu', 'aaa']
// node react ok
// webpack node ok