const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const route = require('./router/index')



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(route)
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen('8080',()=>{
    console.log('server is working 8080')
})