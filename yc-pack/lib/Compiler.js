let fs = require('fs')
let path = require('path')
let processs = require('process')


class Compiler {
	constructor(config) {
		this.config = config;
		//需要保存入口文件的路径
		this.entryId; //”./src/index.js“
		//需要保存所有模块的模块依赖
		this.modules = {};
		this.entry = config.entry; //入口路径
		this.root = processs.cwd(); //工作路径
	}
	getSource(modulePath) {
        let content = fs.readFileSync(modulePath, "utf8");
        return content
    }
    // 解析源码
    parse(source, parentPath) { //AST解析语法树
        console.log(source, parentPath,'ppparentpath');
    }
	// 构建模块
	buildModule(modulePath, isEntry) {
        // 拿到模块的内容
        let source = this.getSource(modulePath);
        // 模块ID modulePath = modulePaht - this.root
        // let moduleName = this.entry
        let moduleName = './'+path.relative(this.root,modulePath);
       
        if(isEntry){
            this.entryId = moduleName; //保存入口的名字
        }
        console.log(source, '123', moduleName),
        console.log(this.root, this.entry, modulePath);
        //解析需要把source源码进行改造， 返回一个依赖列表
        let{sourceCode,dependencies} = this.parse(source, path.dirname(moduleName))
        //把相对路径和模块中的内容 对应起来
        this.modules[moduleName] = sourceCode
	}
	emitFile() {
		//发射文件
	}
	run() {
		//执行 并且创建模块的依赖关系
		this.buildModule(path.resolve(this.root, this.entry), true);

		//发射一个文件 打包后的文件
		this.emitFile();
	}
}

module.exports = Compiler