## 关于自定义打包工具的构建
- 新建一个文件夹 cd到该文件夹下 yarn init -y
- 创建bin目录和yc-pack.js 并 在package.json中加入
```
"bin": {
    "yc-pack": "./bin/yc-pack.js"
  }
```
- 执行 npm link 把包映射到全局下 并在全局下生成·yc-pack·这个命令
- 在需要执行的本地项目root（根）目录下 再执行`npm link yc-pack`映射到本地进行调试 
- 再执行 npx yc-pack 就可以运行yc-pack.js代码了