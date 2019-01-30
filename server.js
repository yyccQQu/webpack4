// express

let express = require('express');

let app = express()

app.get('/api/user',(req,res)=>{
    res.json({name:'yyccqqu'})
})


app.listen(3000)
