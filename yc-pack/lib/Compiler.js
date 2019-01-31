class Compiler {
	constructor(config) {
		this.config = config;
		//需要保存入口文件的路径
		this.entryId; //”./src/index.js“
		//需要保存所有模块的模块依赖
		this.modules = {

        };
		this.entry = config.entry; //入口路径
		this.root = processs.cwd(); //工作路径
	}
	buildModule(modulePath,isEntry) {

    }
	emitFile(){ //发射文件

    }
	run() {
		//执行 并且创建模块的依赖关系
		this.buildModule(path.resolve(this.root, this.entry), true);

		//发射一个文件 打包后的文件
		this.emitFile();
	}
}

module.exports = Compiler