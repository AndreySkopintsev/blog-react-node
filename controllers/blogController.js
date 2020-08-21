const router = require('express').Router()

router.get('/posts',(req,res)=>{
    res.send('hello me again')
})

module.exports = router