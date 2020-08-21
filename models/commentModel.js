const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    text:{type:String,required:true,min:6},
    date:{type:Date,required:true},
    author:{type:String,required:true},
    post:{type:Schema.Types.ObjectId,required:true}
})

module.exports = mongoose.model('Comment',CommentSchema)