const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:{type:String,required:true,min:10},
    password:{type:String,required:true}
})

UserSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

module.exports = mongoose.model('User',UserSchema)