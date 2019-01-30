// express

let express = require('express');
let app = express()
let webpack = require('webpack')

// 中间件
let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js'); //拿到配置文件

let compiler = webpack(config); //用webpack编译

app.use(middle(compiler)) //启动服务，连带把webpack给启动了

app.get('/user',(req,res)=>{
    res.json({name:'yyccqqu1'})
})


app.listen(3000)
