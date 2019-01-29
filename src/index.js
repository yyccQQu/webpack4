
// webpack 打包图片

// 1）在js中创建图片来引入
// 2）在css引入 background（“url")
// 3) <img src=""> 

// file-loader 默认会在内部生成一张图片 到build目录下
// 把生成的图片的名字返回回来


import logo from './docker.png'
import './index.less'

let image = new Image()
image.src = logo;

document.body.append(image)