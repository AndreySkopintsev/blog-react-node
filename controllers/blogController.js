const router = require('express').Router()
const Post = require('../models/postModel')
const Comment = require('../models/postModel')


//GET request to get all blogs

router.get('/posts',(req,res)=>{
    Post.find()
    .exec((err,result)=>{
        if(err){return next(err)}
        res.json(result)
    })
})

//GET request for a single resource

router.get('/posts/:id',(req,res)=>{
    Post.findById(req.params.id)
    .populate('comments')
    .exec((err,result)=>{
        if(err){return next(err)}
        res.json(result)
    })
})

//POST request 

router.post('/posts',(req,res)=>{
    
    let post = new Post({
        title:req.body.title,
        text:req.body.text,
        date:new Date(),
        comments:[]
    })

    post.save((err)=>{
        if(err){return next(err)}
        res.json(post)
    })
    
})

//DELETE request 

router.delete('/posts/:id',(req,res)=>{
    Post.findByIdAndRemove(req.params.id)
    .exec((err,result)=>{
        if(err){return next(err)}
        res.json(result)
    })
})

//PUT request

router.put('/posts/:id',(req,res,next)=>{

    if(req.body.title && !req.body.text){
        Post.findByIdAndUpdate(req.params.id,{title:req.body.title},{new:true})
        .then(updatedPost => {
            res.json(updatedPost)
        })
        .catch(err => next(err))
    }else if(req.body.text && !req.body.title){
        Post.findByIdAndUpdate(req.params.id,{text:req.body.text},{new:true})
        .then(updatedPost => {
            res.json(updatedPost)
        })
        .catch(err => next(err))
    }else{
        Post.findByIdAndUpdate(req.params.id,{title:req.body.title,text:req.body.text},{new:true})
        .then(updatedPost => {
            res.json(updatedPost)
        })
        .catch(err => next(err))
    }

    
})

//COMMENT ROUTES


module.exports = router