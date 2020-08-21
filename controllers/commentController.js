const router = require('express').Router()
const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

//POST request for a comment
router.post('/:id',(req,res)=>{
    console.log(req.params.id)
    let comment = new Comment({
        text:req.body.text,
        date:new Date(),
        author:req.body.author,
        post:req.params.id
    })

    comment.save((err,result)=>{
        if(err){console.log(err)}
        Post.findByIdAndUpdate(req.params.id,{$push:{comments:result.id}})
        .exec((err)=>{
            if(err){ console.log(err) }
            console.log('updated')
        })
        console.log(result._id)
        res.json(result)
    })
})

module.exports = router
