class AsyncParallelHook { //异步钩子 bail保险
    constructor(args){ // args => ['name]
        this.tasks = []
        console.log(args,'args')
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        //tasks为执行方法，args为所传参数，一定要分清！
       let finalCallBack = args.pop();
        console.log(args, 'argsdd')
       let index = 0;
       let done = () => { // Promise.all
          index++;
           if (index == this.tasks.length){
               finalCallBack()
           }
       }
       this.tasks.forEach(task => {
           task(...args, done);
       })
    }
}

let hook = new AsyncParallelHook(["name", "age"]);
let total = 0
//延迟一秒只是为了验证函数是异步执行的
hook.tapAsync('react', function(name, cb) {
    setTimeout(()=>{
        console.log('react', name)
        cb()
    },1000)
})
hook.tapAsync('node', function (name, cb) {
    setTimeout(() => {
        console.log("node", name);
        cb()
    },1000)
})

hook.callAsync(['yyccqqu','aaa'],function(){
    console.log('end')
})

// ['name', 'age'] 'args'
// [['yyccqqu', 'aaa']] 'argsdd'
// react['yyccqqu', 'aaa']
// node['yyccqqu', 'aaa']
// end