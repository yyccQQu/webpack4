class SyncHook { //同步钩子
    constructor(args){ // args => ['name]
        this.tasks = []
        console.log(args,'args')
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach((task)=>{
            task(...args)
        })
    }
}

let hook = new SyncHook(['name','age'])

hook.tap('react', function(name) {
    console.log('react',name)
})
hook.tap('node', function (name) {
    console.log("node", name);
})
hook.call(['yyccqqu','aaa'])