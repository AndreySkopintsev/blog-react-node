require('dotenv').config()
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/userModel')

const opts ={}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET

passport.use(new JwtStrategy(opts,(payload,done)=>{
    console.log('SHIT')
    console.log(payload)
    User.findOne({_id:payload.id},(err,user)=>{
        if(err){
            return done(err,false)
        }
        if(user){
            console.log(user)
            return done(null,user)
        }else{
            return done(null,false)
        }
    })
}))


router.post('/login',(req,res)=>{
    User.findById(req.body.id)
    .exec((err,result)=>{
        if(err){console.log(err)}
        jwt.sign({id:result._id,email:result.email},process.env.SECRET,(err,token)=>{
            res.json({token})
        })
    })
})

router.post('/test',passport.authenticate('jwt',{session:false}) ,(req,res)=>{
    res.send(req.user.email)
})

// function verifyToken(req,res,next){
//     const bearerHeader = req.headers['authorization']

//     const bearer = bearerHeader.split(' ')

//     const token = bearer[1]

//     req.token = token

//     next()
// }

module.exports = router