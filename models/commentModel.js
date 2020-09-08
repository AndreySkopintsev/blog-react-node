const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    text:{type:String,required:true,min:6},
    date:{type:Date,required:true},
    author:{type:String,required:true},
    post:{type:Schema.Types.ObjectId,required:true}
})

CommentSchema.set('toJSON',{
    transform:(docuemnt,returnedObject)=>{

        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Comment',CommentSchema)