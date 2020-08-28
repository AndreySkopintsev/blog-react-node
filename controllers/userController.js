require('dotenv').config()
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/userModel')

const opts ={}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET

passport.use(new JwtStrategy(opts,(payload,done)=>{
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


router.post('/login',(request,response)=>{
    

    User.findOne({email:request.body.user},(err,user)=>{
        if(err){console.log(err)}
        if(!user){response.status(400).send({message:'email or passwords are incorrect'})}
        bcrypt.compare(request.body.password,user.password,(err,result)=>{
            if(err){console.log(err)}
            if(!result){
                response.status(400).send({message:'password is incorrect'})
            }else{
                jwt.sign({id:user._id,email:user.email},process.env.SECRET,(err,token)=>{
                    const info = {
                        user,
                        token
                    }
                    response.json(info)
                })
            }
            
        })
    })
})

router.post('/test',passport.authenticate('jwt',{session:false}) ,(req,res)=>{
    res.send(req.user.email)
})



module.exports = router