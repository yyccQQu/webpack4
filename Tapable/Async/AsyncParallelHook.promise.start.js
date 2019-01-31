let { AsyncParallelHook} = require('tapable');
// 异步钩子（串行）并行 需要等待所有并发的异步事件执行后再执行回调方法
// 同时发送多个请求
// 注册方法 分为 tap注册 tapAsync
// tab库中有三种注册方法 tap 同步注册(cb) tapPromise(注册是promise)

// call  callAsync promise
console.log(AsyncParallelHook,'1234567');
class Lesson {
	constructor() {
        this.index = 0
		this.hooks = {
            arch: new AsyncParallelHook(["name"]),
		};
    }
    tap(){ //注册监听函数 延迟一秒只是为了验证函数是异步执行的
        this.hooks.arch.tapPromise('node', (name)=> {
            
            return new Promise((resolve,reject)=>{
                setTimeout(() => {
                    console.log('node', name)
                    resolve();
                }, 1000)
            })
        });
        this.hooks.arch.tapPromise("react", (name)=> {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("react", name);
                    resolve();
                }, 1000)
            })
		}); 
    }
	start(){
        //只有当以上tab函数执行完了之后才会执行最后的回调函数
        this.hooks.arch.promise("yyccqqu").then(function(){
            console.log('end')
        })
    }
}

let l = new Lesson()
l.tap() //注册监听事件 

l.start() //启动钩子

// AsyncParralleBailHook() 带保险的异步并发的钩子
// 异步并发