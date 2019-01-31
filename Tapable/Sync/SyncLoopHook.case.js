class SyncLoopHook { //同步钩子 bail保险
    constructor(args){ // args => ['name]
        this.tasks = []
        console.log(args,'args')
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach(task => {
            let ret;
            do{
                ret = task(...args)
            }while(ret!=undefined) //直到返回值为undefined的时候再执行下一个函数
        })
    }
}

let hook = new SyncLoopHook(["name", "age"]);
let total = 0
hook.tap('react', function(name) {
    console.log('react',name)
    return ++total === 3 ? undefined: '继续学'
})
hook.tap('node', function (data) {
    console.log("node", data);
})
hook.tap("webpack", function(data) {
    console.log("webpack", data);
});
hook.call(['yyccqqu','aaa'])

// ['name', 'age'] 'args'
// react['yyccqqu', 'aaa']
// react['yyccqqu', 'aaa']
// react['yyccqqu', 'aaa']
// node['yyccqqu', 'aaa']
// webpack['yyccqqu', 'aaa']