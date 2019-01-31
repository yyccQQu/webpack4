let fs = require('fs')
let path = require('path')
let process = require('process')
let babylon = require('babylon')
let t = require('@babel/types')
let traverse = require("@babel/traverse").default;
let generator = require('@babel/generator').default
let ejs = require('ejs')

// babylon 主要就是把源码 转换成ast
// @babel/traverse
// @babel/types 
// @babel/generator


class Compiler {
	constructor(config) {
		this.config = config;
		//需要保存入口文件的路径
		this.entryId; //”./src/index.js“
		//需要保存所有模块的模块依赖
		this.modules = {};
		this.entry = config.entry; //入口路径
		this.root = process.cwd(); //工作路径
	}
	getSource(modulePath) {
        let content = fs.readFileSync(modulePath, "utf8");
        console.log(content,'contentsss')
        return content
    }
    // 解析源码
    parse(source, parentPath) { //AST解析语法树
        //https://astexplorer.net/ 
        //左侧栏中输入require("./a"),看右边的语法解析
        let ast = babylon.parse(source); 
        let dependencies = []; //依赖的数组
        traverse(ast,{
            CallExpression(p) { //调用表达式: a() b()
                let node = p.node; //AST语法 对应的节点
                if(node.callee.name === 'require'){
                    node.callee.name = "__webpack_require__";
                    let moduleName = node.arguments[0].value; //取到模块的引用名字
                    moduleName = moduleName + (path.extname(moduleName)?"":".js");//
                    moduleName ='./'+ path.join(parentPath, moduleName); //'src/a.js'
                    dependencies.push(moduleName); //将路径放入(依赖的数组)
                    node.arguments = [t.stringLiteral(moduleName)];
                }
            }
        });
        let sourceCode = generator(ast).code
        return {sourceCode, dependencies}
    }
	// 构建模块
	buildModule(modulePath, isEntry) {
        // 拿到模块的内容
        let source = this.getSource(modulePath);
        // 模块ID modulePath = modulePaht - this.root
        // let moduleName = this.entry
        let moduleName = './'+path.relative(this.root,modulePath);
       
        if(isEntry){ //为true就为父模块
            console.log(moduleName, "moduleName");
            this.entryId = moduleName; //保存入口的名字
        }
        console.log("source:--->", source);
        console.log("moduleName:--->", moduleName);
        console.log("this.root:--->", this.root)
        console.log("this.entry:--->", this.entry)
        
        //解析需要把source源码进行改造， 返回一个依赖列表
        let{sourceCode,dependencies} = this.parse(source, path.dirname(moduleName))
        // console.log(sourceCode,dependencies,'sdependCode')
        console.log("sourceCode:--->", sourceCode)
        console.log("dependencies:--->", dependencies)
        
        //把相对路径和模块中的内容 对应起来
        this.modules[moduleName] = sourceCode

        dependencies.forEach(dep => { //附属模块的递归加载
            this.buildModule(path.join(this.root,dep),false);//后面参数为false，表示为子模块
        })
	}
	emitFile() {
        //发射文件 
        //用数据 渲染我们的打包结果
        // 拿到 输出到哪个目录下 输出路径
        let output = this.config.output;
        let main = path.join(output.path,output.filename);
        console.log("-------")
        //模板路径
        // let templateString = fs.readFileSync(this.getSource(path.join(__dirname, 'main.ejs')));
        // https://stackoverflow.com/questions/51861832/nodejs-reading-file-enametoolong/51870822#51870822
        let templateString = path.resolve(this.getSource(path.join(__dirname, "main.ejs")))
            .replace(`/${this.root}\//`,"");
        // console.log(templateString, "templateString");
        console.log("-------");

        let code = ejs.render(templateString,{entryId:this.entryId,modules:this.modules})
        this.assets = {}
        //资源中路径对应的代码
        this.assets[main] = code;
        // console.log("main",main)
        fs.writeFileSync(main, this.assets[main]);
	}
	run() {
        //执行 并且创建模块的依赖关系
		this.buildModule(path.resolve(this.root, this.entry),true);
        console.log(this.modules,this.entryId)
		//发射一个文件 打包后的文件
		this.emitFile();
	}
}

module.exports = Compiler