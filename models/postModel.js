const mongoose = require('mongoose')


const Schema = mongoose.Schema

const PostSchema = new Schema({
    title:{type:String,required:true,min:6},
    text:{type:String,required:true,min:10},
    date:{type:Date,required:true},
    comments:[{type:Schema.Types.ObjectId,ref:'Comment'}]
})

PostSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

PostSchema
.virtual('url')
.get(()=>{
    return `/api/posts/${this.id}`
})

module.exports = mongoose.model('Post',PostSchema)