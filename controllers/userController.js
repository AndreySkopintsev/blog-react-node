require('dotenv').config()
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

router.post('/login',(req,res)=>{
    User.findById(req.body.id)
    .exec((err,result)=>{
        if(err){console.log(err)}
        jwt.sign({id:result._id,email:result.email},process.env.SECRET,(err,token)=>{
            res.json({token})
        })
    })
})

router.post('/test',verifyToken ,(req,res)=>{
    jwt.verify(req.token,process.env.SECRET,(err,result)=>{
        res.send(result)
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']

    const bearer = bearerHeader.split(' ')

    const token = bearer[1]

    req.token = token

    next()
}

module.exports = router