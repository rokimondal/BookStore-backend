const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        required:true,
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = bcrypt.hash(this.password,10);
    next();
})

const User = mongoose.model('User',userSchema) 

module.exports = User;