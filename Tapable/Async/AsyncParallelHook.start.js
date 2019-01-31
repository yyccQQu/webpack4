let { AsyncParallelHook} = require('tapable');
// 异步钩子（串行）并行 需要等待所有并发的异步事件执行后再执行回调方法
// 同时发送多个请求
// 注册方法 分为 tap注册 tapAsync
console.log(AsyncParallelHook,'1234567');
class Lesson {
	constructor() {
        this.index = 0
		this.hooks = {
            arch: new AsyncParallelHook(["name"]),
		};
    }
    tap(){ //注册监听函数 延迟一秒只是为了验证函数是异步执行的
        this.hooks.arch.tapAsync('node', (name,cb)=> {
            setTimeout(()=>{
                console.log('node',name)
                cb();
            },1000)
        });
        this.hooks.arch.tapAsync("react", (name,cb)=> {
            setTimeout(() => {
                console.log("react", name);
                cb();
            }, 1000)
		}); 
    }
	start(){
        //只有当以上tab函数执行完了之后才会执行最后的回调函数
        this.hooks.arch.callAsync("yyccqqu",function() {
            console.log('end')
        }); //函数执行 类似发布订阅
    }
}

let l = new Lesson()
l.tap() //注册监听事件 

l.start() //启动钩子

