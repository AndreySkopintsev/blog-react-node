const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./controllers/userController')
const blogRouter = require('./controllers/blogController')
const commentRouter = require('./controllers/commentController')

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

app.use(cors())
app.use(express.json())
app.use('/api',blogRouter)
app.use('/user',userRouter)
app.use('/comments',commentRouter)

module.exports = app