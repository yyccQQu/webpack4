let {SyncWaterfallHook} = require('tapable');
// Waterfall 瀑布
class Lesson {
	constructor() {
		this.hooks = {
            arch: new SyncWaterfallHook(["name"]),
		};
    }
    tap(){ //注册监听函数
        this.hooks.arch.tap('node', function (name) {
            console.log('node',name)
            return 'node学得还不错'
        });
        this.hooks.arch.tap("react", function(data) {
            console.log("react", data);
		}); 
    }
	start(){
        this.hooks.arch.call(["yyccqqu",'aaa']); //函数执行 类似发布订阅
    }
}

let l = new Lesson()
l.tap() //注册监听事件 

l.start() //启动钩子

// node['yyccqqu', 'aaa']
// react node学得还不错