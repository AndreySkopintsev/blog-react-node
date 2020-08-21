const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogController')

const mongoUrl = process.env.MONGO

mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res=>{
    console.log('connected to mongoDB')
})
.catch(err => {
    console.log('error connecting to mongoDB',err.message)
})

const db = mongoose.connection
db.on('error',console.error.bind(console,"mongo connection error"))

app.use(express.json())
app.use('/api',blogRouter)

module.exports = app