const router = require('express').Router()

let posts = [
    {id:1,text:'Hello world',author:'Andy'},
    {id:2,text:'it\'s a me Axel',author:'Axel'},
    {id:3,text:'can i see the manager',author:'Angela'},
]

//GET request to get all blogs

router.get('/posts',(req,res)=>{
    res.json(posts)
})

//GET request for a single resource

router.get('/posts/:id',(req,res)=>{
    let post = posts.filter(post => post.id == req.params.id)
    res.json(post)
})

//POST request 

router.post('/posts',(req,res)=>{
    let newPost = {
        id:req.body.id,
        text:req.body.text,
        quthor:req.body.author
    } 

    posts = [...posts,newPost]
    res.json(newPost)
})

//DELETE request 

router.delete('/posts/:id',(req,res)=>{
    posts = posts.filter(post => post.id !== req.params.id)
    res.send('deleted')
})

//PUT request

router.put('/posts/:id',(req,res)=>{
    let updatedPost = posts.find(post => post.id == req.params.id)
    console.log(posts.indexOf(updatedPost))
})

module.exports = router