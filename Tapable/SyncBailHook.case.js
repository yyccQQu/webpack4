class SyncBailHook { //同步钩子 bail保险
    constructor(args){ // args => ['name]
        this.tasks = []
        console.log(args,'args')
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        let ret; 
        let index = 0; //当前执行第一个
        do{
            ret = this.tasks[index++](...args)
        }while(ret === undefined && index<this.tasks.length);
    }
}

let hook = new SyncBailHook(["name", "age"]);

hook.tap('react', function(name) {
    console.log('react',name)
    return undefined; //如果返回结果不为undefined,那么不会向下执行
})
hook.tap('node', function (name) {
    console.log("node", name);
})
hook.call(['yyccqqu','aaa'])